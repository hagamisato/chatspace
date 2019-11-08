# README
# chat-space DB設計


## userテーブル
|Column|type|Options|
|------|----|-------|
|name|string|null:false|
|mail_address|string|null:false, unique:true|
|password|text|null:false|
## Association
- has_many :messages
- has_many :groups, through:groups_users
- has_many :groups_users

## groupsテーブル
|Column|type|Options|
|------|----|-------|
|group_name|string|null:false|
## Association
- has_many :users, through:groups_users
- has_many :messages
- has_many :groups_users

## messageテーブル
|Column|type|Options|
|------|----|-------|
|text|text|null:true|
|image|image|null:true|
|user_id|integer|null:false, foreign_key: true|
|group_id|integer|null:false, foreign_key: true|
## Association
- belongs_to :user
- belomgs_to :group

## groupes_usersテーブル
|Column|type|Options|
|------|----|-------|
|user_id|integer|null:false, foreign_key: true|
|group_id|integer|null:false, foreign_key: true|
## Association
- belongs_to :user
- belongs_to :group
