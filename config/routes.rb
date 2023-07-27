Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  
  namespace :api, defaults: {formats: :json} do
    resources :users, only: [:create, :index, :show]
    resource :session, only: [:create, :show, :destroy]
    resources :events, only: [:create, :index, :show, :destroy, :update]
  end

  get "*path", to: "static_pages#frontend_index"
end
