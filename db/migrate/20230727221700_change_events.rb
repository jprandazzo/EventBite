class ChangeEvents < ActiveRecord::Migration[7.0]
  def change
    rename_column :events, :type, :event_type
    rename_column :events, :category, :event_category
  end
end
