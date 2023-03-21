# Billboard-Top-100-project

## Project 4 for UMN Data Bootcamp for Team 2

#### **Team members:** Cody Bassett, Glen Dagger, Juan Marin, Taylor Marino

#### Live Github Pages link: 

### Our Site:

#### Our group created a website that predicts if a song would be a top billboard charting song in a specific decade based on its Spotify song features. A user can input any song/artist and a specific decade, then the site will present a percentage of how likely it is of being a top charting song during that timeframe. 

### **Process**:

- In order to create this website we started off by compiling Spotify song features from the top 100 charting songs in every decade from 1960-2010. While also gathering the Spotify song features for songs in each decade that were not top charting songs. After organizing the features for non charting and charting songs we created a database to store all of it. We then trained a machine learning model in every decade to use the common song features of the top charting songs to determine what features a hit song needs. 
- _____
-_____

### **Data**

The data we used for this website was a Kaggle dataset that gathered 1.2 million Spotify songs and their features. We also used the Spotify song API to pull features of top billboard songs that were not included in the Kaggle dataset. 

##### Below are our datasets:

-  Spotify API 
 https://developer.spotify.com/documentation/web-api/reference/#/operations/get-several-audio-features
-  Spotify song Kaggle Dataset
https://www.kaggle.com/datasets/rodolfofigueroa/spotify-12m-songs

#### Presentation Link: 
- https://docs.google.com/presentation/d/1HYz67E426ZDcFdiULjEukrsEuF019WVo4cjyy10KwFE/edit#slide=id.g2040c6cffc0_0_194


### **Limitations/Future Possibilities**
- **Limitation**: 

- **Future Possibilities**: 
In future projects we would like to compile more features for each song. Since each song only had 12 features it was difficult to create an accurate model for predicting a top charting song. With more features, the model would have more information to create an accurate prediction. 

###** Website Image**

