# == Schema Information
#
# Table name: events
#
#  id              :bigint           not null, primary key
#  address         :string
#  capacity        :integer          not null
#  category        :string
#  organizer_name  :string
#  tickets_sold    :integer          default(0), not null
#  timestamp_end   :datetime         not null
#  timestamp_start :datetime         not null
#  title           :string           not null
#  type            :string
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
    validates :capacity, :tickets_sold, :timestamp_start, 
        :timestamp_end, :venue_name, :organizer_id, presence: true

    belongs_to :organizer, class_name: :User, foreign_key: :organizer_id

    enum :type, %w(
                attraction 
                camp_trip_retreat 
                concert_performance 
                conference 
                convention 
                dinner_gala 
                festival_fair 
                party_social_gathering 
                type_other 
                ).map(&:to_sym)

    enum :category, %w(
                    auto_boat_air 
                    business_professional 
                    charity_causes 
                    community_culture 
                    fashion_beauty 
                    film_media_entertainment 
                    food_drink 
                    music 
                    category_other 
                    seasonal_holiday 
                    travel_outdoor
                    ).map(&:to_sym)
end