class CreateGameAttributes < ActiveRecord::Migration
  def change
    create_table :game_attributes do |t|
      t.integer :x_velocity, default: 200
      t.integer :y_velocity, default: 250
      t.decimal :bounce, precision: 2, scale: 1, default: 0.0
      t.integer :y_gravity, default: 100
      t.integer :angle, default: 0
      t.string :sprite, default: "player"
      t.integer :game_instance_id

      t.timestamps null: true
    end
  end
end
