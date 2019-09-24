DROP TABLE total_ridership;

SELECT * FROM total_ridership;

ALTER TABLE total_ridership ADD PRIMARY KEY ("Station_ID");

DROP TABLE weekday_data;

SELECT * FROM weekday_data;

ALTER TABLE weekday_data ADD PRIMARY KEY ("Station_ID");

DROP TABLE saturday_data;

SELECT * FROM saturday_data;

ALTER TABLE saturday_data ADD PRIMARY KEY ("Station_ID");

DROP TABLE sunday_holiday_data;

SELECT * FROM sunday_holiday_data;

ALTER TABLE sunday_holiday_data ADD PRIMARY KEY ("Station_ID");

DROP TABLE ten_year_ridership;

SELECT * FROM ten_year_ridership;

ALTER TABLE ten_year_ridership ADD PRIMARY KEY ("Station_ID");
