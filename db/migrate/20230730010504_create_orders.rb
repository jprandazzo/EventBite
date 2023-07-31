class CreateOrders < ActiveRecord::Migration[7.0]
  def change
    create_table :orders do |t|
      t.references :event, foreign_key: true
      t.references :ticketholder, foreign_key: {to_table: :users}
      t.integer :num_tickets, null:false
      t.timestamps
    end
  end
end
