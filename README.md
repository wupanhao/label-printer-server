# label-printer-server


## configuration

```
npm install
sudo apt install libmysqlclient-dev
sudo pip install MySQL-python
cp config.json.example config.json
```

## MySQL

```
CREATE TABLE `print_task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `data` text NOT NULL,
  `printed` bit(1) DEFAULT b'0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
```


