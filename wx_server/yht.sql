#创建数据库
SET NAMES UTF8;
DROP DATABASE IF EXISTS yht;
CREATE DATABASE yht CHARSET=UTF8;
USE yht;

-- yht_swipe sid,type,simg_url
CREATE TABLE yht_swipe(
  sid INT PRIMARY KEY AUTO_INCREMENT,
  type VARCHAR(32),
  simg_url VARCHAR(64)
);
INSERT INTO yht_swipe VALUES
(null,'image','swipe/swipe1.jpg'),
(null,'image','swipe/swipe2.jpg'),
(null,'image','swipe/swipe3.jpg'),
(null,'image','swipe/swipe4.jpg'),
(null,'image','swipe/swipe5.jpg'),
(null,'image','swipe/swipe6.jpg'),
(null,'image','swipe/swipe7.jpg'),
(null,'image','swipe/swipe8.jpg');

-- yht_laptop lid,lname,price,img_url,submit,classification,num
CREATE TABLE yht_laptop(
  lid INT PRIMARY KEY AUTO_INCREMENT,
  lname VARCHAR(64),
  price DECIMAL(3,1),
  img_url VARCHAR(64),
  submit VARCHAR(128),
  form VARCHAR(128),
  classification VARCHAR(32),
  num VARCHAR(16)
);

INSERT INTO yht_laptop VALUES
(null,'波霸奶茶','12.0','laptop/boba.jpg','奶茶搭配波霸，口感软Q','红茶/波霸/植脂末','波霸',0),
(null,'波霸奶茶','12.0','laptop/boba.jpg','奶茶搭配波霸，口感软Q','红茶/波霸/植脂末','冰沙',0),
(null,'波霸奶茶','12.0','laptop/boba.jpg','奶茶搭配波霸，口感软Q','红茶/波霸/植脂末','奶盖',0),
(null,'波霸奶茶','12.0','laptop/boba.jpg','奶茶搭配波霸，口感软Q','红茶/波霸/植脂末','水果',0),
(null,'波霸奶茶','12.0','laptop/boba.jpg','奶茶搭配波霸，口感软Q','红茶/波霸/植脂末','咖啡',0),
(null,'水果冰沙','18.0','laptop/ice.jpg','新鲜水果搭配均匀冰沙，夏天离你而去','水果/使用冰/红茶/植脂末','波霸',0),
(null,'水果冰沙','18.0','laptop/ice.jpg','新鲜水果搭配均匀冰沙，夏天离你而去','水果/使用冰/红茶/植脂末','冰沙',0),
(null,'水果冰沙','18.0','laptop/ice.jpg','新鲜水果搭配均匀冰沙，夏天离你而去','水果/使用冰/红茶/植脂末','奶盖',0),
(null,'水果冰沙','18.0','laptop/ice.jpg','新鲜水果搭配均匀冰沙，夏天离你而去','水果/使用冰/红茶/植脂末','水果',0),
(null,'水果冰沙','18.0','laptop/ice.jpg','新鲜水果搭配均匀冰沙，夏天离你而去','水果/使用冰/红茶/植脂末','咖啡',0),
(null,'水果奶盖','19.0','laptop/milk.jpg','浓浓的奶盖搭配新鲜水果，绝世好搭配','奶油/水果/红茶/植脂末','波霸',0),
(null,'水果奶盖','19.0','laptop/milk.jpg','浓浓的奶盖搭配新鲜水果，绝世好搭配','奶油/水果/红茶/植脂末','冰沙',0),
(null,'水果奶盖','19.0','laptop/milk.jpg','浓浓的奶盖搭配新鲜水果，绝世好搭配','奶油/水果/红茶/植脂末','奶盖',0),
(null,'水果奶盖','19.0','laptop/milk.jpg','浓浓的奶盖搭配新鲜水果，绝世好搭配','奶油/水果/红茶/植脂末','水果',0),
(null,'水果奶盖','19.0','laptop/milk.jpg','浓浓的奶盖搭配新鲜水果，绝世好搭配','奶油/水果/红茶/植脂末','咖啡',0),
(null,'水果茶','15.0','laptop/fruit.jpg','新鲜水果，维生素营养丰富','水果汁','波霸',0),
(null,'水果茶','15.0','laptop/fruit.jpg','新鲜水果，维生素营养丰富','水果汁','冰沙',0),
(null,'水果茶','15.0','laptop/fruit.jpg','新鲜水果，维生素营养丰富','水果汁','奶盖',0),
(null,'水果茶','15.0','laptop/fruit.jpg','新鲜水果，维生素营养丰富','水果汁','水果',0),
(null,'水果茶','15.0','laptop/fruit.jpg','新鲜水果，维生素营养丰富','水果汁','咖啡',0),
(null,'咖啡','24.0','laptop/coffer.jpg','现磨浓厚咖啡，口感丝滑','咖啡豆','波霸',0),
(null,'咖啡','24.0','laptop/coffer.jpg','现磨浓厚咖啡，口感丝滑','咖啡豆','冰沙',0),
(null,'咖啡','24.0','laptop/coffer.jpg','现磨浓厚咖啡，口感丝滑','咖啡豆','奶盖',0),
(null,'咖啡','24.0','laptop/coffer.jpg','现磨浓厚咖啡，口感丝滑','咖啡豆','水果',0),
(null,'咖啡','24.0','laptop/coffer.jpg','现磨浓厚咖啡，口感丝滑','咖啡豆','咖啡',0),
(null,'薯条','24.0','laptop/chips.jpg','一口香，两口脆，三口会陶醉','土豆','小吃',0),
(null,'巨无霸汉堡','32.0','laptop/hbg.jpg','双层纯牛肉，独特酱料加生菜，起司洋葱酸黄瓜，芝麻面包盖上去，好吃美味麦香堡。','牛肉','小吃',0),
(null,'老北京鸡肉卷','18.0','laptop/roll.jpg','新鲜，多汁，肉嫩','咖啡豆','鸡肉',0),
(null,'香辣鸡翅','20.0','laptop/cw.jpg',' 炸鸡翅，肉嫩弹牙、味美多汁、香辣可口','鸡翅','小吃',0),
(null,'劲爆鸡米花','10.0','laptop/ppc.jpg','劲到爆，辣到爽，一直爆一直爽','鸡肉','小吃',0);
