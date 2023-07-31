class ApplicationController < ActionController::API
    before_action :snake_case_params
    before_action :attach_authenticity_token
    
    include ActionController::RequestForgeryProtection
    rescue_from StandardError, with: :unhandled_error
    rescue_from ActionController::InvalidAuthenticityToken,
        with: :invalid_authenticity_token
    
    protect_from_forgery with: :exception
    # skip_before_action :verify_authenticity_token

    def snake_case_params
        params.deep_transform_keys!(&:underscore)
    end

    def attach_authenticity_token
        headers['X-CSRF-Token'] = masked_authenticity_token(session)
        # headers['X-CSRF-Token'] = form_authenticity_token
    end

    def invalid_authenticity_token
        render json: {message: 'Invalid authenticity token',
            status: :unprocessible_entity}
    end
    
    def current_user
        @current_user ||= User.find_by(session_token: session['_eventbite_session'])
    end

    def require_logged_in
        unless logged_in?
            render json: { errors: ['Must be logged in'] }, status: :unauthorized
        end
    end

    def require_logged_out
        if logged_in?
            render json: { errors: ['Must be logged out'] }, status: 403
        end
    end

    def login(user)
        session['_eventbite_session'] = user.reset_session_token!
    end

    def logged_in?
        !!current_user
    end

    def logout!
        current_user.reset_session_token!
        session['_eventbite_session'] = nil
        @current_user = nil
    end

    def unhandled_error(error)
        if request.accepts.first.html?
          raise error
        else
          @message = "#{error.class} - #{error.message}"
          @stack = Rails::BacktraceCleaner.new.clean(error.backtrace)
          render 'api/errors/internal_server_error', status: :internal_server_error
          
          logger.error "\n#{@message}:\n\t#{@stack.join("\n\t")}\n"
        end
    end

end
