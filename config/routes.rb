Rails.application.routes.draw do
  root "async_uploads#index"
  resources :async_uploads, only: [:index, :new, :create]
end
