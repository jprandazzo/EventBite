class Api::UsersController < ApplicationController
    before_action :require_logged_out, only: [:create]

    wrap_parameters :user, include: User.attribute_names + ['password', 'firstName', 'lastName', 'orders', 'organizedEvents', 'likedEvents', 'attendingEvents', 'imageUrl', 'currentPageId']

    def index
        render json: {users: User.all}
    end

    def create
        
        @user = User.new(user_params)
        if @user.save
            login(@user)
            render :show
        else
            render json: {errors: @user.errors.full_messages},
            status: :unprocessable_entity
        end
    end

    def show
        @user = User.find(params[:id])
        @user_organized_events = Event.where(organizer_id: @user.id)
        @user_attending_events = @user.attending_events
        @user_orders = @user.orders
        render :show
    end

    def update
        @user = User.find(params[:id])
        if logged_in?
            @user.email = params[:email]
            @user.first_name = params[:first_name]
            @user.last_name = params[:last_name]
            @user.save

            db_likes = Like.where(liker_id: @user.id)
            browser_likes = params[:liked_events].map {|eid| Like.new(event_id: eid, liker_id: @user.id)}
            
            likes_to_delete = db_likes.filter do |db_like|
                browser_likes.none? do |browser_like|
                    browser_like.liker_id == db_like.liker_id && browser_like.event_id == db_like.event_id
                end
            end

            new_likes = browser_likes.filter do |browser_like| 
                db_likes.none? do |db_like|
                    browser_like.liker_id == db_like.liker_id && browser_like.event_id == db_like.event_id
                end
            end
            
            likes_to_delete.each {|like| like.destroy}
            new_likes.each {|like| like.save}
            
            render :show
        else
            @user = nil
            render json: {message: 'Successfully logged out!'}
        end

    end

    def destroy
        @user = User.find(params[:id])
        id = @user.id
        if @user == current_user
            user.destroy!
            render json: :id
        else
            render json: [@user.errors.full_messages],
            status: :unprocessable_entity
        end
    end

    private
    def user_params
        params.require(:user).permit(:email, :password, :first_name, :last_name, :orders, :organized_events, :liked_events, :attending_events, :image_url, :current_page_id)
    end
end
