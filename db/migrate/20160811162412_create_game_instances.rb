class CreateGameInstances < ActiveRecord::Migration
  def change
    create_table :game_instances do |t|
      t.string :slug
      t.string :name
      t.integer :test_value, default: 0

      t.timestamps null: false
    end
    add_index :game_instances, :slug, unique: true
  end
end
