class CategorySize < ApplicationRecord
    belongs_to :category, optional: true
    belongs_to :items_size, optional: true
end
