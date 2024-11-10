USE bookBridgeDB;

DROP FUNCTION IF EXISTS getNumberOfBooks;
DROP FUNCTION IF EXISTS getAverageOfRatings;
DROP PROCEDURE IF EXISTS getAverageByBook;

DELIMITER //

CREATE FUNCTION getNumberOfBooks()
RETURNS INT
DETERMINISTIC
BEGIN
   DECLARE total INT DEFAULT 0;

   SELECT COUNT(*) INTO total 
   FROM books;

   RETURN total;
END //

CREATE FUNCTION getAverageOfRatings()
RETURNS DECIMAL(3,2)
DETERMINISTIC
BEGIN
   DECLARE average DECIMAL(3,2) DEFAULT 0.0;

   SELECT AVG(rating) INTO average 
   FROM reviews;

   RETURN average;
END //


CREATE PROCEDURE getAverageByBook()
BEGIN
   SELECT title, average 
   FROM books 
   JOIN (
      SELECT book_id, AVG(rating) AS average 
      FROM reviews
      GROUP BY book_id
   ) AS avg_ratings   
   ON books.id = avg_ratings.book_id;

END //

DELIMITER ;

