module GameUrlHelper

  def unique_game_name
    name_taken = true
    while name_taken
      name = game_url_fruit_options.sample + " " + game_url_body_part_options.sample
      name_taken = GameInstance.where(name: name).any?
    end
    return name
  end

  def game_url_fruit_options
    ["Apple", "Apricot", "Artichoke", "Asparagus", "Avocado", "Banana", "Broccoli", "Cabbage", "Carrot", "Celery", "Cucumber", "Fig", "Garlic", "Grapefruit", "Kiwi", "Leek", "Lemon", "Lettuce", "Lime", "Mango", "Melon", "Olive", "Onion", "Papaya", "Peach", "Pear", "Pineapple", "Plum", "Potato", "Prune", "Pumpkin", "Radish", "Raisin", "Rhubarb", "Shallot", "Spinach", "Squash", "Tangerine", "Tomato", "Turnip", "Zucchini"]
  end

  def game_url_body_part_options
    ["Ankles", "Arms", "Brains", "Claws", "Ears", "Elbows", "Eyes", "Feathers", "Feet", "Fingers", "Fins", "Hands", "Hearts", "Heels", "Hips", "Kidneys", "Knees", "Legs", "Lips", "Lungs", "Necks", "Nose", "Nostrils", "Paws", "Shins", "Shoulders", "Spines", "Spleens", "Tails", "Teeth", "Thighs", "Toes", "Tongues", "Torsos", "Whiskers", "Wings", "Wrists"]
  end
end