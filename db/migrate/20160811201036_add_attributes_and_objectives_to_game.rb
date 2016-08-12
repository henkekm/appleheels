class AddAttributesAndObjectivesToGame < ActiveRecord::Migration
  def change
    add_column :game_instances, :game_attributes, :string
    add_column :game_instances, :objectives, :string
  end
end
