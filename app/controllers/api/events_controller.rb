class Api::EventsController < ApplicationController
    before_action :require_logged_in, except: [:index, :show, :search]

    wrap_parameters :event, include: Event.attribute_names + ['organizerName', 'eventType', 'eventCategory', 'venueName', 'organizerId', 'timestampStart', 'timestampEnd']

    def create
        @event = Event.new(event_params)
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

    def search
        string = params[:string]
        price = params[:price]
        date = params[:date]

        @events = Event.all
        if string != 'null'
            @events = @events.where(
                'title ILIKE ?
                OR description ILIKE ?
                OR address ILIKE ?
                OR venue_name ILIKE ?',
                "%#{string}%", "%#{string}%", "%#{string}%", "%#{string}%")
        end

        if price
            if price == 'free'
                @events = @events.where('price = 0', "%#{price}")
            else
                @events = @events.where('price>0', "%#{price}")
            end
        end
        
            render :search
    end

    def show
        @event=Event.find(params[:id])

        render :show
    end

    def update
        @event=Event.find(params[:event_id])
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

        if @event.organizer_id == current_user.id
            @event.destroy
            render json: {event_id: params[:id]}
        else
            render json: {errors: 'Must be event owner to delete!'},
            status: :unprocessable_entity
        end
    end

    private
    def event_params
        params.require(:event).permit(:event_id, :address, :capacity, :event_category, :organizer_name, :title, :event_type, :venue_name, :organizer_id, :price, :description, :timestamp_start, :timestamp_end)
    end
end