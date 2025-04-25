
```mysql
create table product (
	`productID` int NOT null,
	`categoryID` int NOT null,
	`brandID` int NOT null,
	`name` varchar(40) NOT null,
	`description` varchar(40) NOT null,
	`price` float NOT null,  
	`stockQuantity` int NOT null
)

ALTER TABLE `product` 
	ADD PRIMARY KEY (`productID`), 
	ADD CONSTRAINT `product_brand_fk` FOREIGN KEY (`brandID`) REFERENCES `brand` (`brandID`) ON UPDATE CASCADE ON DELETE CASCADE, 
	ADD CONSTRAINT `product_category_fk` FOREIGN KEY (`categoryID`) REFERENCES `category` (`categoryID`) ON UPDATE CASCADE ON DELETE CASCADE;

```

```mysql
create table brand (
	`brandID` int Not null,
	`name` varchar(40) NOT null,
	`description` varchar(40) NOT null
)

ALTER TABLE `brand` 
	ADD PRIMARY KEY (`brandID`);

```

```mysql
create table review (
	`productID` int NOT null,
	`userID` int NOT null,
	`date` date NOT null,
	`text` varchar(40) NOT null,
	`rating` float NOT null
)

ALTER TABLE `review` 
	ADD PRIMARY KEY (`productID`, `userID`, `date`), 
	ADD CONSTRAINT `review_product_fk` FOREIGN KEY (`productID`) REFERENCES `product` (`productID`) ON UPDATE CASCADE ON DELETE CASCADE, 
	ADD CONSTRAINT `review_user_fk` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON UPDATE CASCADE ON DELETE CASCADE;

```

```mysql
create table orderitem (
	`orderItemID` int NOT null,
	`orderID` int NOT null,
	`productID` int NOT null,
	`quantity` int NOT null
)

ALTER TABLE `orderitem` 
	ADD PRIMARY KEY (`orderItemID`), 
	ADD CONSTRAINT `orderItem_product_fk` FOREIGN KEY (`productID`) REFERENCES `product` (`productID`) ON UPDATE CASCADE ON DELETE CASCADE, 
	ADD CONSTRAINT `orderItem_order_fk` FOREIGN KEY (`orderID`) REFERENCES `order` (`orderID`) ON UPDATE CASCADE ON DELETE CASCADE;

```

```mysql
create table category (
	`categoryID` int NOT null,
	`name` varchar(40) NOT null,
	`description` varchar(200) NOT null
)

ALTER TABLE `category` 
	ADD PRIMARY KEY (`categoryID`);

```

```mysql
create table order (
	`orderID` int NOT null,
	`userID` int NOT null,
	`orderdate` date NOT null,
	`totalAmount` float NOT null,
	`status` varchar(100) NOT null
)

ALTER TABLE `order` 
	ADD PRIMARY KEY (`orderID`), 
	ADD CONSTRAINT `order_user_fk` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON UPDATE CASCADE ON DELETE CASCADE;
```

```mysql
create table cartItem (
	`cartID` int NOT null,
	`productID` int NOT null,
	`quantity` int NOT null
)

ALTER TABLE `cartItem` 
	ADD PRIMARY KEY (`productID`, `cartID`), 
	ADD CONSTRAINT `cartItem_cart_fk` FOREIGN KEY (`cartID`) REFERENCES `cart` (`userID`) ON UPDATE CASCADE ON DELETE CASCADE, 
	ADD CONSTRAINT `cartItem_product_fk` FOREIGN KEY (`productID`) REFERENCES `product` (`productID`) ON UPDATE CASCADE ON DELETE CASCADE;

```

```mysql
create table cart (
	`userID` int NOT null,
	`status` varchar(100) NOT null
)

ALTER TABLE `cart` 
	ADD PRIMARY KEY (`userID`), 
	ADD CONSTRAINT `cart_user_fk` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON UPDATE CASCADE ON DELETE CASCADE;

```

```mysql
create table payment (
	`paymentID` int NOT null,
	`orderID` int NOT null,
	`paymentmethod` varchar(40) NOT null,
	`amount` float NOT null,
	`paymentDate` date NOT null,
	`status` varchar(100) NOT null
)

ALTER TABLE `payment` 
	ADD PRIMARY KEY (`paymentID`), 
	ADD CONSTRAINT `payment_order_fk` FOREIGN KEY (`orderID`) REFERENCES `order` (`orderID`) ON UPDATE CASCADE ON DELETE CASCADE;

```

```mysql
create table user (
	`userID` int NOT null,
	`username` varchar(40) NOT null
)

ALTER TABLE `user` 
	ADD PRIMARY KEY (`userID`), 
	ADD CONSTRAINT `user_loginDetails_fk` FOREIGN KEY (`username`) REFERENCES `loginDetails` (`username`) ON UPDATE CASCADE ON DELETE CASCADE;

```

```mysql
create table userInfo (
	`userID` int NOT null,
	`firstname` varchar(40) NOT null,
	`lastname` varchar(40) NOT null,
	`address` varchar(100) NOT null
)

ALTER TABLE `userInfo` 
	ADD PRIMARY KEY (`userID`), 
	ADD CONSTRAINT `userInfo_user_fk` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON UPDATE CASCADE ON DELETE CASCADE;

```

```mysql
create table loginDetails (
	`username` varchar(40) NOT null,
	`password` varchar(40) NOT null
)

ALTER TABLE `loginDetails` 
	ADD PRIMARY KEY (`username`);

```
