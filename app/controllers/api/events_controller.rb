class Api::EventsController < ApplicationController
    before_action :require_logged_in, except: [:index, :show]

    wrap_parameters :event, include: Event.attribute_names + ['organizerName', 'eventType', 'eventCategory', 'venueName', 'organizerId']

    def create
        @event = Event.new(event_params)
        @event.timestamp_start = DateTime.new(2023,01,01)
        @event.timestamp_end = DateTime.new(2023,01,02)
        @event.organizer_id = current_user.id
        if @event.save
            render :show
        else
            render json: {errors: @event.errors.full_messages},
            status: :unprocessable_entity
        end

    end

    def index
        render :index
    end

    def show
        @event=Event.find(params[:id])

        render :show
    end

    def update
        @event=Event.find(params[:id])

        if @event.organizer_id == current_user.id
            @event.update(event_params)
            
            @event.save
            render :show
            
        else
            render json: {errors: 'Must be event owner to update!'},
            status: :unprocessable_entity
        end
    end

    def destroy
        @event = Event.find(params[:id])
        debugger

        if @event.organizer_id == current_user.id
            id = @event.id
            @event.destroy
            render json: {event_id: id}
        else
            render json: {errors: 'Must be event owner to delete!'},
            status: :unprocessable_entity
        end
    end

    private
    def event_params
        params.require(:event).permit(:address, :capacity, :event_category, :organizer_name, :title, :event_type, :venue_name, :organizer_id, :price, :description)
    end
end