CREATE DATABASE IF NOT EXISTS electromart;
USE electromart;

CREATE TABLE `brand` (
	`brandID` int NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` varchar(200) NOT NULL
);

CREATE TABLE `category` (
	`categoryID` int NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` varchar(200) NOT NULL
);

CREATE TABLE `product` (
	`productID` int NOT NULL,
	`categoryID` int NOT NULL,
	`brandID` int NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` varchar(200) NOT NULL,
	`price` decimal(10,2) NOT NULL,  
	`stockQuantity` int NOT NULL
);

CREATE TABLE `userInfo` (
	`userID` int NOT NULL,
	`firstname` varchar(40) NOT NULL,
	`lastname` varchar(40) NOT NULL,
	`address` varchar(100) NOT NULL
);

CREATE TABLE `loginDetails` (
	`username` varchar(40) NOT NULL,
	`password` varchar(60) NOT NULL
);

CREATE TABLE `user` (
	`userID` int NOT NULL,
	`username` varchar(40) NOT NULL,
	`isPrivileged` BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE `order` (
	`orderID` int NOT NULL,
	`userID` int NOT NULL,
	`orderDate` date NOT NULL,
	`totalAmount` decimal(10,2) NOT NULL,
	`status` varchar(100) NOT NULL
);

CREATE TABLE `orderItem` (
	`orderItemID` int NOT NULL,
	`orderID` int NOT NULL,
	`productID` int NOT NULL,
	`quantity` int NOT NULL
);

CREATE TABLE `cart` (
	`userID` int NOT NULL,
	`status` varchar(100) NOT NULL
);


CREATE TABLE `cartItem` (
	`cartID` int NOT NULL,
	`productID` int NOT NULL,
	`quantity` int NOT NULL
);

CREATE TABLE `payment` (
	`paymentID` int NOT NULL,
	`orderID` int NOT NULL,
	`paymentMethod` varchar(40) NOT NULL,
	`amount` decimal(10,2) NOT NULL,
	`paymentDate` date NOT NULL,
	`status` varchar(100) NOT NULL
);
	
CREATE TABLE `review` (
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
	MODIFY productID INT NOT NULL AUTO_INCREMENT;

ALTER TABLE `loginDetails` 
	ADD PRIMARY KEY (`username`);


ALTER TABLE `user` 
	ADD PRIMARY KEY (`userID`), 
	MODIFY userID INT NOT NULL AUTO_INCREMENT;

ALTER TABLE `userInfo` 
	ADD CONSTRAINT `userInfo_user_fk` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON UPDATE CASCADE ON DELETE CASCADE;

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

GRANT SELECT ON electromart.* TO 'customer';

INSERT INTO `brand` (`name`, `description`) VALUES
('Apple', 'Electronic Devices'),
('Samsung', 'Electronic Hardware'),
('Logitech', 'Gaming utilities'),
('Nikon', 'Cameras and photography utilities'),
('Electrolux', 'Household Appliences'),
('Philips', 'Electronic Utilities');

INSERT INTO `category` (`name`, `description`) VALUES
('Gaming', 'Devices and utilities for gaming'),
('Photography', 'Devices and utilities for photography'),
('Household', 'Products related to households'),
('Electronics', 'Products related to electronics'),
('Devices', 'Products related to computers, mobile devices, and other smart devices');

INSERT INTO `product` (`categoryID`, `brandID`, `name`, `description`, `price`, `stockQuantity`) VALUES
(4, 1, 'iPhone 16 Pro', '512GB storage', 12500.00, 97),
(4, 2, 'Samsung 65" The Frame 4K QLED Smart TV (2024)', '120Hz, HDMI, Smart TV', 19990.00, 30),
(1, 3, 'Logitech G502-HERO', 'LIGHTSYNC RGB, Adaptable buttons, 121g, 2.1m cable length', 999.00, 72),
(2, 4, 'D7500', '21,51 Million pixels, DX, CMOS, 23,5 x 15,7 mm', 14490.00, 20),
(3, 5, 'Electrolux Fridge GRG7MD39W', 'H: 186cm, B: 59.5cm, D: 65cm, 389l', 11995.00, 10),
(5, 6, 'Philips Oneblade Pro 360 QP6542', '90 minutes use time, OneBlade-technology, Waterproof', 699.00, 100);

INSERT INTO `loginDetails` (`username`, `password`) VALUES
('ola.normann@icloud.com', 'placeholder'),
('kari.traa@gmail.com', 'placeholder'),
('john.doe@hotmail.com', 'placeholder'),
('ravi.beas@outlook.com', 'placeholder');

INSERT INTO `user` (`username`, `isPrivileged`) VALUES
('ola.normann@icloud.com', FALSE),
('kari.traa@gmail.com', FALSE),
('john.doe@hotmail.com', TRUE),
('ravi.beas@outlook.com', FALSE);

INSERT INTO `userInfo` (`userID`,`firstname`, `lastname`, `address`) VALUES
(1, 'Ola', 'Normann', 'Norgesveien 4'),
(2, 'Kari', 'Traa', 'Kuleloypa 1'),
(3, 'John', 'Doe', 'American Street 16'),
(4, 'Ravi', 'Beas', 'Street Street 1');

INSERT INTO `cart` (`userID`, `status`) VALUES
(1, 'Some items unavailable'),
(2, 'Items available'),
(3, 'No items available'),
(4, 'Items available');

INSERT INTO `cartItem` (`cartID`, `productID`, `quantity`) VALUES
(1,1,1),
(1,3,1),
(1,6,1),
(2,2,1),
(2,5,1),
(3,4,1);

INSERT INTO `order` (`userID`, `orderDate`, `totalAmount`, `status`) VALUES
(1, '2025-04-01', 12500.00, 'Ordered'),
(2, '2025-04-02', 19990.00, 'Preparing'),
(3, '2025-04-03', 11995.00, 'Ordered');

INSERT INTO `orderItem` (`orderID`, `productID`, `quantity`) VALUES
(1,1,1),
(2,2,1),
(3,5,1);

INSERT INTO `payment` (`orderID`, `paymentMethod`, `amount`, `paymentDate`, `status`) VALUES
(1, 'Credit Card', 12500.00, '2025-04-01', 'Paid'),
(2, 'PayPal', 19990.00, '2025-04-02', 'Paid'),
(3, 'Credit Card', 11995.00, '2025-04-03', 'Paid');

INSERT INTO `review` (`productID`, `userID`, `date`, `text`, `rating`) VALUES
(1, 1, '2025-04-01', 'This is a great product', 5),
(2, 2, '2025-04-02', 'This is an ok product', 4),
(3, 3, '2025-04-03', 'This is a bad product', 1),
(4, 4, '2025-04-04', 'This is a great product', 5);