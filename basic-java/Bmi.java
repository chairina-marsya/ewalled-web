public class Bmi {
    public static void main(String[] args) {
        float tinggiBadan = 148;
        float beratBadan = 53;
        float bmi = (float) (beratBadan / (Math.pow(tinggiBadan / 100, 2)));
        System.out.println(bmi);
        //
    }
}