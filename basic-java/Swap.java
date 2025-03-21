// 1. Write a Java program that swaps the values of two 
// integer variables without using a third variable.

// Example Input:
// int a = 5, b = 10;

// Example Output:
// Before swapping: a = 5, b = 10  
// After swapping: a = 10, b = 5  
public class Swap {
    public static void main(String[] args)
    {
        int x = 100;
        int y = 200;

        System.out.println("x sebelum swap: " + x);
        System.out.println("y sebelum swap: " + y);

        x = x+y;
        y = x-y;
        x = x-y;

        System.out.println("x sebelum swap: " + x);
        System.out.println("y sebelum swap: " + y);
    }
}

