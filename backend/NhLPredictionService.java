package backend;

// import org.springframework.boot.SpringApplication;
// import org.springframework.boot.autoconfigure.SpringBootApplication;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;
// import org.springframework.web.client.RestTemplate;

// @SpringBootApplication
// public class NhLPredictionService {
//     public static void main(String[] args) {
//         SpringApplication.run(NhLPredictionService.class, args);
//     }
// }

// @RestController
// class PredictionController {
//     private final RestTemplate restTemplate = new RestTemplate();
//     private static final String NHL_API_URL = "https://api-web.nhle.com/v1/club-schedule-season/%s/%s";

//     @GetMapping("/predict")
//     public String predictGame(@RequestParam String team1, @RequestParam String team2, @RequestParam String season) {
//         String team1Data = fetchTeamData(team1, season);
//         String team2Data = fetchTeamData(team2, season);
        
//         // TODO: Implement logic to analyze data and generate prediction
        
//         return "Prediction logic to be implemented";
//     }

//     private String fetchTeamData(String teamAbbr, String season) {
//         String url = String.format(NHL_API_URL, teamAbbr, season);
//         return restTemplate.getForObject(url, String.class);
//     }
// }
