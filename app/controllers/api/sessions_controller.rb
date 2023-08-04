class Api::SessionsController < ApplicationController
    before_action :require_logged_out, only: [:create]
    before_action :require_logged_in, only: [:destroy]

    def show
        if current_user
            @user = current_user
            render 'api/users/show'
        else
            render json: {user: nil}
        end
    end

    def create
        email = params[:email]
        password = params[:password]
        @user = User.find_by_credentials(email, password)
        if @user
            login(@user)
            @user_organized_events = Event.where(organizer_id: @user.id)
            @user_attending_events = @user.attending_events
            @user_orders = @user.orders
            render 'api/users/show'
        else
            render json: { errors: ['Invalid Email or Passvord. Look in Van Helsing\'s Journal?'] }, 
        status: :unprocessable_entity
        end
    end

    def destroy
        logout!
        render json: {message: ['Successfully logged out']}
    end
end
