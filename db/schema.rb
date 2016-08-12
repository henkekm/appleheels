# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160812165122) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "friendly_id_slugs", force: :cascade do |t|
    t.string   "slug",                      null: false
    t.integer  "sluggable_id",              null: false
    t.string   "sluggable_type", limit: 50
    t.string   "scope"
    t.datetime "created_at"
  end

  add_index "friendly_id_slugs", ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true, using: :btree
  add_index "friendly_id_slugs", ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type", using: :btree
  add_index "friendly_id_slugs", ["sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_id", using: :btree
  add_index "friendly_id_slugs", ["sluggable_type"], name: "index_friendly_id_slugs_on_sluggable_type", using: :btree

  create_table "game_attributes", force: :cascade do |t|
    t.integer  "x_velocity",                               default: 200
    t.integer  "y_velocity",                               default: 250
    t.decimal  "bounce",           precision: 2, scale: 1, default: 0.0
    t.integer  "y_gravity",                                default: 100
    t.integer  "angle",                                    default: 0
    t.string   "sprite",                                   default: "player"
    t.integer  "game_instance_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "game_instances", force: :cascade do |t|
    t.string   "slug"
    t.string   "name"
    t.integer  "test_value",  default: 0
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.string   "status"
    t.string   "objectives"
    t.integer  "jump_power",  default: 350
    t.string   "down_method", default: ""
  end

  add_index "game_instances", ["slug"], name: "index_game_instances_on_slug", unique: true, using: :btree

end
