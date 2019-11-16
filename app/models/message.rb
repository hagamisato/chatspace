class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user  

  mount_uploader :image, ImageUploader

  validates :content, presence: true, unless: :image?
  # validates :image, presence: true, unless: :content? 
end
