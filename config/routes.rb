Rails.application.routes.draw do

  get 'static_pages/cart'

  get 'static_pages/checkout'

  root 'store#index'

  resources :items

 
end