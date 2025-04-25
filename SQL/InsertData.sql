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

MÅ FIKSE BCRYPT HASHA PASSORD
INSERT INTO `loginDetails` (`username`, `password`) VALUES
('ola.normann@icloud.com', ''),
('kari.traa@gmail.com', ''),
('john.doe@hotmail.com', ''),
('ravi.beas@outlook.com', '');

INSERT INTO `cart` (`userID`, `status`) VALUES
(1, 'Some items unavailable'),
(2, 'Items available'),
(3, 'No items available'),
(4, 'Items available');

INSERT INTO `cartItem` (`cartID`, `productID`, `quantity`) VALUES
(),
();
