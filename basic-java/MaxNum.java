// 2. Write a Java program that takes three integer inputs and 
// determines the largest number using conditional statements.

// Example Input:
// int a = 15, b = 22, c = 18;

// Example Output:
// The largest number is 22.

public class MaxNum {
    public static void main(String[] args) {
        int a = 15, b = 22, c = 18;
        int maxa = Math.max(a, b);
        int max = Math.max(maxa, c);

        System.out.println("maximum :"+ max);

    }
}
