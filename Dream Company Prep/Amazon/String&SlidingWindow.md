📝 Thread 16: Sentence Palindrome (Valid Palindrome)
🧑‍💼 Interviewer: Check if a string is a palindrome, considering only alphanumeric characters and ignoring cases. Wait, what function do you use to check for alphanumeric characters in C++?

🗣️ Candidate:
I will use the built-in C++ function isalnum(char).

Your Doubt Answered: Bhai, isalnum ka matlab hota hai "Is Alphanumeric?". Yeh function true return karta hai agar character 'a-z', 'A-Z', ya '0-9' ke beech ka ho. Agar koi space ' ', comma ,, ya colon : hai, toh yeh false return karega.

Logic: Hum Two-Pointer approach lagayenge. Ek pointer start pe, ek end pe. Agar koi character alphanumeric nahi hai, toh hum usko simply skip kar denge (start++ ya end--). Phir bache hue valid characters ko lowercase (tolower) karke compare karenge.

📝 Thread 17: Longest Palindromic Substring (LeetCode 5) - 🔥 DP vs Expand Around Center
🧑‍💼 Interviewer: Find the longest palindromic substring in a string s. Will you use DP or something else? And what about Manacher's Algorithm?

🗣️ Candidate (Clearing your confusion):

DP vs Expand Around Center: Hum DP tab use karte hain jab Subsequence (tute hue characters) nikalna ho. Substring (continuous) ke liye DP O(N^2) time aur O(N^2) space leti hai (ek 2D table banani padti hai). Interviewer hamesha O(1) space maangta hai! Isliye hum "Expand Around Center" use karenge!

Manacher’s Algorithm: Manacher's O(N) time leta hai. Lekin sach batau? Yeh algorithm bohot complex hai aur 99% standard interviews mein expect nahi kiya jata. Interviewer ko sirf O(N^2) Time + O(1) Space wala Expand Around Center chahiye hota hai.

💡 Expand Around Center Logic (Your Code Explained):
Haan bhai, tera logic bilkul sahi hai: "Bahar ek for loop chalayenge har character ke liye, aur us character ko center maan ke andar while loop se left-right expand karenge."
Lekin Palindrome 2 type ke hote hain:

Odd Length (e.g., "aba"): Center ek single character hota hai (b). Yahan left aur right dono i se shuru honge.

Even Length (e.g., "abba"): Center do characters ke beech mein hota hai (bb). Yahan left i hoga aur right i+1 hoga.

💻 Clean Code (Exactly what you wrote):

C++

class Solution {
public:
    string longestPalindrome(string s) {
        int n = s.length();
        int start = 0, maxLen = 1;

        // Bahar wala loop: Har character ko center maan ke check karenge
        for (int i = 0; i < n; i++) {
            
            // 🔴 Odd length palindrome (center is just 'i')
            int l = i, r = i;
            while (l >= 0 && r < n && s[l] == s[r]) {
                if (r - l + 1 > maxLen) {
                    start = l;
                    maxLen = r - l + 1;
                }
                l--; r++; // Center se bahar ki taraf expand karo
            }

            // 🔵 Even length palindrome (center is 'i' and 'i+1')
            l = i; r = i + 1;
            while (l >= 0 && r < n && s[l] == s[r]) {
                if (r - l + 1 > maxLen) {
                    start = l;
                    maxLen = r - l + 1;
                }
                l--; r++; // Center se bahar ki taraf expand karo
            }
        }
        return s.substr(start, maxLen);
    }
};
📝 Thread 18: Palindromic Substrings (LeetCode 647)
🧑‍💼 Interviewer: Okay, now don't give me the longest one. Just count how many palindromic substrings exist in total.

🗣️ Candidate:
Since we just learned the "Expand Around Center" technique, this is a free point!
Instead of tracking maxLen and start, I will just keep a global count. Har baar jab s[l] == s[r] match karega, iska matlab ek naya valid palindrome mil gaya, toh main count++ kar dunga. Code exactly same rahega LC 5 jaisa!

📝 Thread 19: Smallest window in a String containing all chars of another (LeetCode 76)
🧑‍💼 Interviewer: Given strings s and t, return the minimum window substring of s such that every character in t is included in the window.

🗣️ Candidate (Answering your DP doubt):

Why NOT DP? LCS (Longest Common Subsequence) mein hum do strings ke elements ka common sequence dhoondhte hain (order matter karta hai). Yahan par humein ek continuous window chahiye jisme t ke saare characters majood hon, order chahe kuch bhi ho! Continuous aur Frequency ka problem = Sliding Window + Hash Map.

🏃 In-Depth Dry Run & Logic:
s = "ADOBECODEBANC", t = "ABC"

Requirement Map: Pehle t ke saare characters ek array/map mein daal lo. (Mujhe 1 'A', 1 'B', 1 'C' chahiye). Variable required = 3.

Expand Window (Right Pointer): right pointer aage badhao. Jo character mile, uski frequency map mein kam karo. Agar koi kaam ka character mil gaya (jiski frequency > 0 thi), toh required-- karo.

Shrink Window (Left Pointer): Jaise hi required == 0 ho jaye (matlab saare characters window mein aa gaye), tab tak apne left pointer ko aage badha kar window ko chota (shrink) karo jab tak required wapas se > 0 na ho jaye.

Har valid window (jab required == 0 tha) ka size record karo, aur sabse minimum wala return karo.

📝 Thread 20: Longest Substring Without Repeating Characters (LeetCode 3)
🧑‍💼 Interviewer: Find the length of the longest substring without repeating characters.

🗣️ Candidate:
Another classic Sliding Window. Main ek left pointer, ek right pointer, aur ek vector<int> hash(256, -1) rakhunga (jo har character ka aakhiri dekha hua index store karega).

💡 Strategy:

right ko aage badhao. Check karo: Kya yeh character pehle dekha hai? (hash[s[right]] != -1).

Agar dekha hai, aur woh mere current window (left se aage) ke andar hai, toh main apne left ko jump kara ke seedha us duplicate ke ek kadam aage rakh dunga: left = max(left, hash[s[right]] + 1).

Har step pe current character ka fresh index hash mein update karo: hash[s[right]] = right.

Length calculate karo: maxLen = max(maxLen, right - left + 1).

📝 Thread 21: Longest Repeating Character Replacement (LeetCode 424)
🧑‍💼 Interviewer: You are given a string s and an integer k. You can replace any character at most k times. Find the length of the longest substring containing the same letter.

🗣️ Candidate:
Yeh thoda tricky sliding window hai. Hum ek window leke chalenge, aur track karenge ki us window mein sabse zyada frequency wala character kaunsa hai (maxFreq).

Logic Rule: Agar meri window ka total size hai window_len, aur usme sabse zyada aane wala character maxFreq baar aata hai, toh mujhe baaki bache hue characters ko replace karna padega.

Formula: Characters to Replace = window_len - maxFreq.

Agar yeh replace karne wale characters <= k hain, toh window valid hai.

Agar yeh > k ho gaye, toh window invalid hai, mujhe left pointer aage badhana padega window shrink karne ke liye!

📝 Thread 22: Word Search (LeetCode 79)
🧑‍💼 Interviewer: Given an m x n grid of characters and a word, return true if the word exists in the grid. The word can be constructed from letters of sequentially adjacent cells (horizontally or vertically).

🗣️ Candidate:
This is a standard DFS (Depth First Search) + Backtracking problem.

Pura matrix scan karo. Jaise hi word[0] match ho, wahan se DFS start karo.

DFS mein 4 directions (Up, Down, Left, Right) mein jao aur agla character word[index+1] dhundo.

Backtracking kyu? Taaki hum ek hi raste mein ek cell ko do baar use na kar lein. DFS mein ghuste waqt cell ko visited mark karo (e.g., replace char with #), aur DFS se wapas aate waqt wapas original char daal do (backtrack).

Bhai, Strings aur Sliding Window ke yeh patterns agar dimaag mein set hain, toh interview me code faste nahi hain. Tera Expand Around Center wala logic ekdam sahi tha, aur LC 76 wala DP ka doubt nikal de dimaag se — jab bhi substrings/continuous elements ki baat aaye aur frequency track karni ho, pehla khayal Sliding Window ka aana chahiye, DP ka nahi!


📝 Thread 23: Remove Outermost Parentheses (LeetCode 1021)
🧑‍💼 Interviewer: How do you remove the outermost parentheses of every primitive string? And explain your logic of count-- and s.substr().

🗣️ Candidate (Answering your explicit doubts):

1. count--; pehle minus karne ka logic kya tha?
Bhai dekh, jab bhi humein ) milta hai, iska matlab ek bracket close ho raha hai.

Agar main decrement karne ke baad dekhta hoon ki count == 0 ho gaya, iska matlab kya hai? Iska matlab yeh wahi aakhiri ) bracket tha jisne pure primitive block ko close kiya (matlab yeh outermost bracket hai).

Kyunki mujhe outermost ko ignore karna hai, isliye main pehle decrement karta hoon, aur phir check karta hoon ki agar count > 0 hai tabhi usko result mein daalo. Agar 0 ho gaya matlab outermost tha, chhod do!

2. s.substr(start + 1, i - start - 1); yeh kya hai aur kyu?
C++ mein substr ka syntax hota hai: s.substr(shuruat_ka_index, length_kitni_chahiye). Yeh ending index nahi leta, length leta hai!

Maan le ek block mila: ( ( ) )

Iska outermost ( hai start index par.

Iska outermost ) hai i index par.

Humein sirf andar ka ( ) chahiye. Toh yeh kahan se shuru hoga? start + 1 se.

Iski length kitni hogi? Pura block start se i tak hai (Total length = i - start + 1). Humein isme se 2 outermost brackets hatane hain. Toh length bachi: (i - start + 1) - 2 = i - start - 1.

Isliye formula bana: substr(start + 1, i - start - 1).

📝 Thread 24: Reverse Words in a String (LeetCode 151)
🧑‍💼 Interviewer: You wrote a very clean two-pointer code to reverse the words in a string. Can you dry run this for me step-by-step and explain the extraction logic?

🗣️ Candidate:
Yes! My approach iterates from right to left, skipping spaces, isolating each word, and appending it to the result string.

🏃 In-Depth Dry Run:
Let string s = " amazing coding skills " (length 23)
Pointer i starts at 22 (last index). result = ""

First Word ("skills"):

Skip Spaces: i is at 22 (space). while (s[i] == ' ') loop runs. i becomes 21 (character 's').

Mark End: end = i (so, end = 21).

Find Start of Word: while (s[i] != ' ') i--;. It moves back over "skills". It stops when i = 15 (which is the space before "skills").

Extract Word: word = s.substr(i + 1, end - i).

Starting index: i + 1 = 16 (letter 's').

Length: end - i = 21 - 15 = 6.

word = "skills".

Append: result += word ➡️ result = "skills".

Second Word ("coding"):

Skip Spaces: i is currently 15 (space). Loop moves it to 14 (letter 'g').

Mark End: end = 14.

Find Start: Move i back. Stops at i = 8 (space before "coding").

Extract Word: substr(8 + 1, 14 - 8) -> Start at 9, length 6.

word = "coding".

Append: result is not empty, so add a space first. Then append. ➡️ result = "skills coding".

Third Word ("amazing"):

Skip Spaces: i is 8. Moves to 7 (letter 'g').

Mark End: end = 7.

Find Start: Move i back. Stops at i = 0 (space before "amazing").

Extract Word: substr(0 + 1, 7 - 0) -> Start at 1, length 7.

word = "amazing".

Append: Add space, then append. ➡️ result = "skills coding amazing".

Finish:

i is 0. Next loop skips the starting space, i becomes -1.

Outer loop breaks (while(i >= 0)).

Final Output returned: "skills coding amazing".

🧑‍💼 Interviewer (Cross-Question): Why is the length of the word end - i in your substr? Shouldn't it be end - start + 1?

🗣️ Candidate (The Math Logic):
Usually, length is end - start + 1. But look closely at my pointer i!
My i does not stop on the first character of the word. It stops on the SPACE exactly one index before the word.
So the actual start index of my word is i + 1.
If I apply the standard formula (end - start_index + 1):
length = end - (i + 1) + 1
length = end - i - 1 + 1
length = end - i.
That's why substr(i + 1, end - i) perfectly extracts the word!