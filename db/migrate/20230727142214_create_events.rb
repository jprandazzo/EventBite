class CreateEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :events do |t|
      t.string :title, null: false
      t.string :organizer_name

      t.string :type
      t.string :category

      t.string :venue_name, null:false
      t.string :address

      t.timestamp :timestamp_start, null: false
      t.timestamp :timestamp_end, null: false

      t.integer :capacity, null: false
      t.integer :tickets_sold, null: false, default: 0

      t.references :organizer, foreign_key: {to_table: :users}

      t.timestamps
    end
  end
end
