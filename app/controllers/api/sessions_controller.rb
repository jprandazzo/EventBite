class Api::SessionsController < ApplicationController
    before_action :require_logged_out, only: [:create]
    before_action :require_logged_in, only: [:destroy]

    def show
        if current_user
            @user = current_user
            render :show
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
            render :show
        else
            render json: { errors: ['Invalid Email or Password.'] }, 
        status: :unprocessable_entity
        end
    end

    def destroy
        logout!
        render json: {message: ['Successfully logged out']}
    end
end
