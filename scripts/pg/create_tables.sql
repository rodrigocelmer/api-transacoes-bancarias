create table users(
	id uuid not null,
	name varchar(50) not null,
	cpf varchar(11) not null,
	email varchar(50),
	age numeric(3,0) not null,
	constraint pk_users primary key (id),
	unique(cpf,email)
);

create table transactions(
	id uuid not null,
	title varchar(20) not null,
	value numeric(8,2) not null,
	"type" varchar(7) not null,
	id_user uuid not null,
	constraint pk_transactions primary key (id),
	constraint fk_user foreign key(id_user) references users(id)
);

insert into users (id, name, cpf, email, age)
values
	(uuid_generate_v4(), 'Rodrigo', '02857815026', 'rodrigo@rodrigo.com', 27);

select * from users;
select * from transactions;