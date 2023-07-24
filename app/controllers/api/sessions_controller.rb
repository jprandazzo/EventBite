class Api::SessionsController < ApplicationController
    # before_action :require_logged_in, only: [:create]
    # before_action :require_logged_in, only: [:destroy]

    def show
        debugger
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
        debugger
        if @user
            login(@user)
            render 'api/users/show'
        else
            render json: { errors: ['Invalid credentials, please try again'] }, 
            status: :unauthorized
        end
    end

    def destroy
        logout!
        render json: {message: ['Successfully logged out']}
    end
end
