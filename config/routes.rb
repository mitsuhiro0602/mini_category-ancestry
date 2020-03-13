Rails.application.routes.draw do
  root 'items#index'
  resources :items, only: [:index, :show, :new, :edit, :destroy] do
    # Ajaxで動くアクションのルートを作成のルートを作成
    collection do
      get 'get_category_children', defaults: { format: 'json' }
      get 'get_category_grandchildren', defaults: {format: 'json'}
    end
  end
end
