CREATE DATABASE IF NOT EXISTS electromart;
USE electromart;

CREATE TABLE brand (
	`brandID` int NOT NULL,
	`name` varchar(40) NOT NULL,
	`description` varchar(200) NOT NULL
);

CREATE TABLE category (
	`categoryID` int NOT NULL,
	`name` varchar(40) NOT NULL,
	`description` varchar(200) NOT NULL
);

CREATE TABLE product (
	`productID` int NOT NULL,
	`categoryID` int NOT NULL,
	`brandID` int NOT NULL,
	`name` varchar(40) NOT NULL,
	`description` varchar(200) NOT NULL,
	`price` decimal(10,2) NOT NULL,  
	`stockQuantity` int NOT NULL
);

CREATE TABLE userInfo (
	`userID` int NOT NULL,
	`firstname` varchar(40) NOT NULL,
	`lastname` varchar(40) NOT NULL,
	`address` varchar(100) NOT NULL
);

CREATE TABLE loginDetails (
	`username` varchar(40) NOT NULL,
	`password` varchar(60) NOT NULL
);

CREATE TABLE user (
	`userID` int NOT NULL,
	`username` varchar(40) NOT NULL,
	`isPrivileged` BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE order (
	`orderID` int NOT NULL,
	`userID` int NOT NULL,
	`orderDate` date NOT NULL,
	`totalAmount` decimal(10,2) NOT NULL,
	`status` varchar(100) NOT NULL
);

CREATE TABLE orderItem (
	`orderItemID` int NOT NULL,
	`orderID` int NOT NULL,
	`productID` int NOT NULL,
	`quantity` int NOT NULL
);

CREATE TABLE cart (
	`userID` int NOT NULL,
	`status` varchar(100) NOT NULL
);


CREATE TABLE cartItem (
	`cartID` int NOT NULL,
	`productID` int NOT NULL,
	`quantity` int NOT NULL
);

CREATE TABLE payment (
	`paymentID` int NOT NULL,
	`orderID` int NOT NULL,
	`paymentMethod` varchar(40) NOT NULL,
	`amount` decimal(10,2) NOT NULL,
	`paymentDate` date NOT NULL,
	`status` varchar(100) NOT NULL
);
	
CREATE TABLE review (
	`productID` int NOT NULL,
	`userID` int NOT NULL,
	`date` date NOT NULL,
	`text` varchar(40) NOT NULL,
	`rating` float NOT NULL
);

ALTER TABLE `brand` 
	ADD PRIMARY KEY (`brandID`),
	ADD UNIQUE (`name`),
	MODIFY brandID INT NOT NULL AUTO_INCREMENT;

ALTER TABLE `category` 
	ADD PRIMARY KEY (`categoryID`),
	ADD UNIQUE (`name`),
	MODIFY categoryID INT NOT NULL AUTO_INCREMENT;

ALTER TABLE `product` 
	ADD PRIMARY KEY (`productID`), 
	ADD CONSTRAINT `product_brand_fk` FOREIGN KEY (`brandID`) REFERENCES `brand` (`brandID`) ON UPDATE CASCADE ON DELETE CASCADE, 
	ADD CONSTRAINT `product_category_fk` FOREIGN KEY (`categoryID`) REFERENCES `category` (`categoryID`) ON UPDATE CASCADE ON DELETE CASCADE,
	product MODIFY productID INT NOT NULL AUTO_INCREMENT;

ALTER TABLE `userInfo` 
	ADD PRIMARY KEY (`userID`), 
	ADD CONSTRAINT `userInfo_user_fk` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON UPDATE CASCADE ON DELETE CASCADE;


ALTER TABLE `loginDetails` 
	ADD PRIMARY KEY (`username`);


ALTER TABLE `user` 
	ADD PRIMARY KEY (`userID`), 
	ADD CONSTRAINT `user_loginDetails_fk` FOREIGN KEY (`username`) REFERENCES `loginDetails` (`username`) ON UPDATE CASCADE ON DELETE CASCADE,
	MODIFY userID INT NOT NULL AUTO_INCREMENT;


ALTER TABLE `order` 
	ADD PRIMARY KEY (`orderID`), 
	ADD CONSTRAINT `order_user_fk` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON UPDATE CASCADE ON DELETE CASCADE,
	MODIFY orderID INT NOT NULL AUTO_INCREMENT;


ALTER TABLE `orderItem` 
	ADD PRIMARY KEY (`orderItemID`), 
	ADD CONSTRAINT `orderItem_product_fk` FOREIGN KEY (`productID`) REFERENCES `product` (`productID`) ON UPDATE CASCADE ON DELETE CASCADE, 
	ADD CONSTRAINT `orderItem_order_fk` FOREIGN KEY (`orderID`) REFERENCES `order` (`orderID`) ON UPDATE CASCADE ON DELETE CASCADE,
	MODIFY orderItemID INT NOT NULL AUTO_INCREMENT;


ALTER TABLE `cart` 
	ADD PRIMARY KEY (`userID`), 
	ADD CONSTRAINT `cart_user_fk` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON UPDATE CASCADE ON DELETE CASCADE;


ALTER TABLE `cartItem` 
	ADD PRIMARY KEY (`productID`, `cartID`), 
	ADD CONSTRAINT `cartItem_cart_fk` FOREIGN KEY (`cartID`) REFERENCES `cart` (`userID`) ON UPDATE CASCADE ON DELETE CASCADE, 
	ADD CONSTRAINT `cartItem_product_fk` FOREIGN KEY (`productID`) REFERENCES `product` (`productID`) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE `payment` 
	ADD PRIMARY KEY (`paymentID`), 
	ADD CONSTRAINT `payment_order_fk` FOREIGN KEY (`orderID`) REFERENCES `order` (`orderID`) ON UPDATE CASCADE ON DELETE CASCADE,
	MODIFY paymentID INT NOT NULL AUTO_INCREMENT;


ALTER TABLE `review` 
	ADD PRIMARY KEY (`productID`, `userID`, `date`), 
	ADD CONSTRAINT `review_product_fk` FOREIGN KEY (`productID`) REFERENCES `product` (`productID`) ON UPDATE CASCADE ON DELETE CASCADE, 
	ADD CONSTRAINT `review_user_fk` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON UPDATE CASCADE ON DELETE CASCADE;

CREATE ROLE `customer`;
CREATE ROLE `employee`;

GRANT SELECT ON electromart
