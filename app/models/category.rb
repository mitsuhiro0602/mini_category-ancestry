class Category < ApplicationRecord
    has_ancestry
    has_many :items
    has_many :category_sizes
    has_many :items_sizes, through: :category_sizes
end
