# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_08_02_132037) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "events", force: :cascade do |t|
    t.string "title", null: false
    t.string "organizer_name"
    t.string "event_type"
    t.string "event_category"
    t.string "venue_name", null: false
    t.string "address"
    t.datetime "timestamp_start", precision: nil, null: false
    t.datetime "timestamp_end", precision: nil, null: false
    t.integer "capacity", null: false
    t.integer "tickets_sold", default: 0, null: false
    t.bigint "organizer_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "price"
    t.text "description"
    t.index ["organizer_id"], name: "index_events_on_organizer_id"
  end

  create_table "likes", force: :cascade do |t|
    t.bigint "liker_id"
    t.bigint "event_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_likes_on_event_id"
    t.index ["liker_id"], name: "index_likes_on_liker_id"
  end

  create_table "orders", force: :cascade do |t|
    t.bigint "event_id"
    t.bigint "ticketholder_id"
    t.integer "num_tickets", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_orders_on_event_id"
    t.index ["ticketholder_id"], name: "index_orders_on_ticketholder_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "events", "users", column: "organizer_id"
  add_foreign_key "likes", "events"
  add_foreign_key "likes", "users", column: "liker_id"
  add_foreign_key "orders", "events"
  add_foreign_key "orders", "users", column: "ticketholder_id"
end
