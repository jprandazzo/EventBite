# == Schema Information
#
# Table name: events
#
#  id              :bigint           not null, primary key
#  address         :string
#  capacity        :integer          not null
#  description     :text
#  event_category  :string
#  event_type      :string
#  organizer_name  :string
#  price           :decimal(, )
#  tickets_sold    :integer          default(0), not null
#  timestamp_end   :datetime         not null
#  timestamp_start :datetime         not null
#  title           :string           not null
#  venue_name      :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  organizer_id    :bigint
#
# Indexes
#
#  index_events_on_organizer_id  (organizer_id)
#
# Foreign Keys
#
#  fk_rails_...  (organizer_id => users.id)
#
class Event < ApplicationRecord

    validates :title, :capacity, :tickets_sold, :timestamp_start, 
        :timestamp_end, :venue_name, :organizer_id, :price, :description, presence: true

    validates :price, numericality: { only_integer: true, greater_than_or_equal_to: 0 }

    validates :capacity, numericality: { only_integer: true, greater_than: 0 }

    validates :timestamp_end, comparison: { greater_than: :timestamp_start}

    belongs_to :organizer, class_name: :User, foreign_key: :organizer_id

    has_one_attached :photo
    has_many :orders, dependent: :destroy
    has_many :ticketholders, through: :orders
    has_many :likes, dependent: :destroy
    has_many :likers, through: :likes, source: :liker

    validates :event_type, inclusion: {in: %w(
                attraction 
                camp_trip_retreat 
                concert_performance 
                conference 
                convention 
                dinner_gala 
                festival_fair 
                party_social_gathering 
                type_other 
                ),
            message: "Not a valid valid event type"}, allow_nil: true

    validates :event_category, inclusion: {in: %w(
                    community_culture 
                    fashion_beauty 
                    film_media_entertainment 
                    food_drink 
                    music 
                    category_other 
                    travel_outdoor
                    ),
                message: "Not a valid event category"}, allow_nil: true
end
