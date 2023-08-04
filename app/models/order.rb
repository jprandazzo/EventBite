# == Schema Information
#
# Table name: orders
#
#  id              :bigint           not null, primary key
#  num_tickets     :integer          not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  event_id        :bigint
#  ticketholder_id :bigint
#
# Indexes
#
#  index_orders_on_event_id         (event_id)
#  index_orders_on_ticketholder_id  (ticketholder_id)
#
# Foreign Keys
#
#  fk_rails_...  (event_id => events.id)
#  fk_rails_...  (ticketholder_id => users.id)
#
class Order < ApplicationRecord
    belongs_to :ticketholder, class_name: :User, foreign_key: :ticketholder_id
    belongs_to :event

    def organizer
        User.where(id: self.event.organizer_id)
    end

    def self.create!(params)
        order = Order.new(ticketholder_id: params[:ticketholder_id], event_id: params[:event_id], num_tickets: params[:num_tickets])
        event = Event.find(order.event_id)
        if event && event.capacity >= order.num_tickets
            order.save
            event.capacity -= order.num_tickets
            event.tickets_sold += order.num_tickets
            event.save
        end
    end
end
