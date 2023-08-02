class Api::LikesController < ApplicationController
    before_action :require_logged_in

    wrap_parameters :like, include: Like.attribute_names + [:likerId, :eventId]

    def create
        @like = Like.new(like_params)

        if @like.valid?
            @like.save
            render :show
        else
            render json [@like.errors.full_messages],
            status: :unprocessable_entity
        end
    end

    def destroy
        @like = Like.find(params[:event_id])
        id = @like.id
        if @like.liker_id == params[:liker_id]
            @like.destroy
            render :destroy
        else
            render json [@like.errors.full_messages],
            status: :unprocessable_entity
        end
    end

    private
    def like_params
        params.require(:like).permit(:liker_id, :event_id)
    end
end
