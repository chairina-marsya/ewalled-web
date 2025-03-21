create table users(
id serial primary key,
nama varchar not null,
username varchar(15) unique not null,
email varchar unique,
password varchar not null,
avatar varchar,
phone_no varchar not null
)

insert
	into
	users (nama,
	username,
	email,
	password,
	avatar,
	phone_no)
values ('mawar',
'mawara',
'mawara@mail.com',
'password',
'avatar',
'082099899')

create table transactions (
    id SERIAL primary key,
    amount MONEY not null,
    date_time TIMESTAMP default CURRENT_TIMESTAMP,
    transaction_no SERIAL unique, 
	sender_id INT not null,
    recipient_id INT not null, 
    status VARCHAR not null,
    foreign key (sender_id) references users(id) on
delete
	cascade,
	foreign key (recipient_id) references users(id) on
	delete
		cascade
);

alter table transactions add description varchar(60)

insert
	into
	transactions (amount,
	sender_id,
	recipient_id,
	description,
	status)
values (3000,
4,
1,
'gojek',
'success')


select
	t2.*,
	case
		when t.id = t2.recipient_id
then 'top up'
		else 'transfer'
	end as type
from
	users t
right join transactions t2 on
	t.id = t2.sender_id
	or t.id = t2.recipient_id
where
	t.id = 1
