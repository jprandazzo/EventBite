Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  
  namespace :api, defaults: {formats: :json} do
    resources :users, only: [:create, :index, :show, :update]
    resource :session, only: [:create, :show, :destroy]
    resources :events, only: [:create, :index, :show, :destroy, :update]
    resources :orders, only: [:create, :destroy, :show]
    resources :likes, only: [:create, :destroy]
  end

  get "*path", to: "static_pages#frontend_index"
end
