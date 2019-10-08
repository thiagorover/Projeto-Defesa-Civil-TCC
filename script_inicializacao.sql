/*
Inserts de Inicialização do banco
*/
INSERT INTO `profiles` (`id`,`description`,`created_at`,`updated_at`,`status`) VALUES (1,'Administrador',NULL,NULL,1);
INSERT INTO `users` (`id`,`profile_id`,`name`,`email`,`password`,`status`,`receive_notification`,`created_at`,`updated_at`,`is_admin`,`last_latitude`,`last_longitude`) VALUES (1,1,'Admin','admin@senai.br','$2a$10$m0HFkCHjB4OhScVWAevyXefOa.DYEV3sqjc.6mqQkT9dFXhfBA2Pm',1,1,'2018-05-02 22:02:03','2018-05-02 22:02:03',0,NULL,NULL);
