class Api::OrdersController < ApplicationController
    before_action :require_logged_in

    wrap_parameters :order, include: Order.attribute_names + [:eventId, :ticketholderId, :numTickets, :orderId]

    def create
        @order = Order.new(order_params)
        @event = Event.find(@order.event_id)
        debugger
        if @event && @event.capacity >= @order.num_tickets
            debugger
            @order.save
            @event.capacity -= @order.num_tickets
            render :show
        else
            render json: [@order.errors.full_messages],
            status: :unprocessable_entity
        end
    end

    def destroy
        @order = Order.find(params[:order_id])
        if @order && @order.ticketholder_id == current_user.id
            @order.destroy
            render json: [:order_id]
        else
            render json: ['Error: order could not be canceled'],
            status: :unprocessable_entity
        end
    end

    private
    def order_params
        params.require(:order).permit(:event_id, :ticketholder_id, :num_tickets, :order_id)
    end
end
