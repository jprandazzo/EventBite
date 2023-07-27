class Api::EventsController < ApplicationController
    # before_action :require_logged_in

    wrap_parameters :event, include: Event.attribute_names + ['organizerName', 'eventType', 'eventCategory', 'venueName', 'organizerId']

    def create
        debugger
        @event = Event.new(event_params)
        debugger
        @event.timestamp_start = DateTime.new(2023,01,01)
        @event.timestamp_end = DateTime.new(2023,01,02)
        @event.organizer_id = current_user.id

        if @event.save
            render :show
        else
            render json: {errors: @event.errors.full_messages},
            status: :unprocessable_entity
            debugger
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

        if @event.organizer_id == current_user
            @event.address=params[:address]
            @event.capacity=params[:capacity]
            @event.event_type=params[:event_type]
            @event.event_category=params[:event_category]
            @event.organizer_name=params[:organizer_name]
            @event.timestamp_start=params[:timestamp_start]
            @event.title=params[:title]
            @event.venue_name=params[:venue_name]
            
        else
            render json: {errors: 'Must be event owner to update!'},
            status: :unprocessable_entity
        end
    end

    def destroy
        @event = Event.find(params[:id])
        @event.destroy
        render :index
    end

    private
    def event_params
        params.require(:event).permit(:address, :capacity, :event_category, :organizer_name, :title, :event_type, :venue_name, :organizer_id)
    end
end

test1 = Event.new(capacity: 50, timestamp_start: DateTime.new(2024,1,1),timestamp_end: DateTime.new(2024,1,1,12), title: "test event 1", venue_name: 'online')
test2 = Event.new(capacity: 100, timestamp_start: DateTime.new(2023,8,14,17),timestamp_end: DateTime.new(2023,8,14,23), title: "test event 2 joe bday", venue_name: 'joe\'s apt')