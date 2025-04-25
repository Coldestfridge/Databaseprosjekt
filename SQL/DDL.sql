create table brand (
	`brandID` int NOT NULL AUTO_INCREMENT,
	`name` varchar(40) NOT NULL,
	`description` varchar(200) NOT NULL
)

ALTER TABLE `brand` 
	ADD PRIMARY KEY (`brandID`),
	ADD UNIQUE (`name`);

create table category (
	`categoryID` int NOT NULL AUTO_INCREMENT,
	`name` varchar(40) NOT NULL,
	`description` varchar(200) NOT NULL
)

ALTER TABLE `category` 
	ADD PRIMARY KEY (`categoryID`),
	ADD UNIQUE (`name`);

create table product (
	`productID` int NOT NULL AUTO_INCREMENT,
	`categoryID` int NOT NULL,
	`brandID` int NOT NULL,
	`name` varchar(40) NOT NULL,
	`description` varchar(200) NOT NULL,
	`price` decimal(10,2) NOT NULL,  
	`stockQuantity` int NOT NULL
)

ALTER TABLE `product` 
	ADD PRIMARY KEY (`productID`), 
	ADD CONSTRAINT `product_brand_fk` FOREIGN KEY (`brandID`) REFERENCES `brand` (`brandID`) ON UPDATE CASCADE ON DELETE CASCADE, 
	ADD CONSTRAINT `product_category_fk` FOREIGN KEY (`categoryID`) REFERENCES `category` (`categoryID`) ON UPDATE CASCADE ON DELETE CASCADE;

create table userInfo (
	`userID` int NOT NULL,
	`firstname` varchar(40) NOT NULL,
	`lastname` varchar(40) NOT NULL,
	`address` varchar(100) NOT NULL
)

ALTER TABLE `userInfo` 
	ADD PRIMARY KEY (`userID`), 
	ADD CONSTRAINT `userInfo_user_fk` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON UPDATE CASCADE ON DELETE CASCADE;


create table loginDetails (
	`username` varchar(40) NOT NULL,
	`password` varchar(40) NOT NULL
)

ALTER TABLE `loginDetails` 
	ADD PRIMARY KEY (`username`);

create table user (
	`userID` int NOT NULL AUTO_INCREMENT,
	`username` varchar(40) NOT NULL,
	`isPrivileged` BOOLEAN NOT NULL DEFAULT FALSE
)

ALTER TABLE `user` 
	ADD PRIMARY KEY (`userID`), 
	ADD CONSTRAINT `user_loginDetails_fk` FOREIGN KEY (`username`) REFERENCES `loginDetails` (`username`) ON UPDATE CASCADE ON DELETE CASCADE;

create table order (
	`orderID` int NOT NULL AUTO_INCREMENT,
	`userID` int NOT NULL,
	`orderdate` date NOT NULL,
	`totalAmount` decimal(10,2) NOT NULL,
	`status` varchar(100) NOT NULL
)

ALTER TABLE `order` 
	ADD PRIMARY KEY (`orderID`), 
	ADD CONSTRAINT `order_user_fk` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON UPDATE CASCADE ON DELETE CASCADE;

create table orderitem (
	`orderItemID` int NOT NULL AUTO_INCREMENT,
	`orderID` int NOT NULL,
	`productID` int NOT NULL,
	`quantity` int NOT NULL
)

ALTER TABLE `orderitem` 
	ADD PRIMARY KEY (`orderItemID`), 
	ADD CONSTRAINT `orderItem_product_fk` FOREIGN KEY (`productID`) REFERENCES `product` (`productID`) ON UPDATE CASCADE ON DELETE CASCADE, 
	ADD CONSTRAINT `orderItem_order_fk` FOREIGN KEY (`orderID`) REFERENCES `order` (`orderID`) ON UPDATE CASCADE ON DELETE CASCADE;

create table cart (
	`userID` int NOT NULL,
	`status` varchar(100) NOT NULL
)

ALTER TABLE `cart` 
	ADD PRIMARY KEY (`userID`), 
	ADD CONSTRAINT `cart_user_fk` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON UPDATE CASCADE ON DELETE CASCADE;


create table cartItem (
	`cartID` int NOT NULL,
	`productID` int NOT NULL,
	`quantity` int NOT NULL
)

ALTER TABLE `cartItem` 
	ADD PRIMARY KEY (`productID`, `cartID`), 
	ADD CONSTRAINT `cartItem_cart_fk` FOREIGN KEY (`cartID`) REFERENCES `cart` (`userID`) ON UPDATE CASCADE ON DELETE CASCADE, 
	ADD CONSTRAINT `cartItem_product_fk` FOREIGN KEY (`productID`) REFERENCES `product` (`productID`) ON UPDATE CASCADE ON DELETE CASCADE;

create table payment (
	`paymentID` int NOT NULL AUTO_INCREMENT,
	`orderID` int NOT NULL,
	`paymentMethod` varchar(40) NOT NULL,
	`amount` decimal(10,2) NOT NULL,
	`paymentDate` date NOT NULL,
	`status` varchar(100) NOT NULL
)

ALTER TABLE `payment` 
	ADD PRIMARY KEY (`paymentID`), 
	ADD CONSTRAINT `payment_order_fk` FOREIGN KEY (`orderID`) REFERENCES `order` (`orderID`) ON UPDATE CASCADE ON DELETE CASCADE;

	
create table review (
	`productID` int NOT NULL,
	`userID` int NOT NULL,
	`date` date NOT NULL,
	`text` varchar(40) NOT NULL,
	`rating` float NOT NULL
)

ALTER TABLE `review` 
	ADD PRIMARY KEY (`productID`, `userID`, `date`), 
	ADD CONSTRAINT `review_product_fk` FOREIGN KEY (`productID`) REFERENCES `product` (`productID`) ON UPDATE CASCADE ON DELETE CASCADE, 
	ADD CONSTRAINT `review_user_fk` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON UPDATE CASCADE ON DELETE CASCADE;

CREATE ROLE `customer`;
CREATE ROLE `employee`;

GRANT SELECT ON electromart
