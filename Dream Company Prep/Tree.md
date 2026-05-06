📝 Thread 8: Boundary Traversal of Binary Tree (Premium)
🧑‍💼 Interviewer: Print the boundary of a binary tree (Left boundary -> Leaves -> Right boundary in reverse). You have written the code, but can you explain why your addLeftBoundary and addRightBoundary use a while loop, but addLeaves uses Recursion?

🗣️ Candidate:

Left/Right Boundaries (While Loop): Left boundary ek single straight rasta hai. Humko bas root->left pakad ke neeche jaate rehna hai (aur agar left na ho toh right). Ek single path hone ki wajah se while loop best aur simple hai.

Leaves (Recursion): Leaves kisi ek straight raste par nahi hote. Woh pure tree ke bottom mein faile hue hote hain (kuch left subtree mein, kuch right mein). Saari leaves ko left-to-right order mein dhoondhne ke liye humein pura tree traverse karna padega (DFS). Isliye addLeaves mein recursion lagana zaroori hai.

📝 Thread 9: Right Side View of Binary Tree (LeetCode 199)
🧑‍💼 Interviewer: Your code tries to find the right side view by just following root->right and sometimes checking left. What if the tree is skewed left? Example: Root has no right child, but left child goes very deep. Your code will fail to see the deeper left nodes which are visible from the right side.

🗣️ Candidate:
You are right. My previous approach was flawed because the Right View is not just the "right boundary". It is the last node of every level.

💡 Optimal Logic (Reverse Preorder - O(N)):
Instead of a complex while loop, we use Recursion. Normal Preorder is (Root -> Left -> Right). We will do a Reverse Preorder (Root -> Right -> Left).

We keep track of our level.

If we reach a level for the first time (ans.size() == level), it means this is the rightmost node of this level! We add it to our answer.

💻 Optimal Code:

C++

class Solution {
public:
    void solve(TreeNode* root, int level, vector<int>& ans) {
        if(root == NULL) return;
        
        // Agar main is level pe pehli baar aaya hoon (from right side)
        if(ans.size() == level) {
            ans.push_back(root->val);
        }
        
        // Pehle Right jao, fir Left jao (Reverse Preorder)
        solve(root->right, level + 1, ans);
        solve(root->left, level + 1, ans);
    }

    vector<int> rightSideView(TreeNode* root) {
        vector<int> ans;
        solve(root, 0, ans);
        return ans;
    }
};
📝 Thread 10: Morris Traversal - Inorder & Preorder (O(1) Space)
🧑‍💼 Interviewer: Explain Morris Inorder Traversal. Specifically, why do we print the node in the else block when we are breaking the temporary link?

🗣️ Candidate (In-Depth Feel):
In Inorder (Left -> Root -> Right), rules say: "Root ko tab tak print mat karo jab tak uska pura Left tree visit na ho jaye."

Jab hum thread banate hain (prev->right = cur), tab humne left subtree visit nahi kiya hota hai. Hum bas rasta bana rahe hain wapas aane ka. Toh print nahi kar sakte.

Jab hum ghoom ke ussi node par wapas aate hain, aur dekhte hain ki link pehle se bana hua hai, iska matlab: "Mera left subtree pura visit ho chuka hai, main wapas aa gaya!"

Isliye hum link todte hain (prev->right = nullptr), aur NOW hum cur ko print karte hain, aur phir cur->right chale jaate hain.

🧑‍💼 Interviewer: Can we do Preorder using Morris? Dry run it for me.

🗣️ Candidate:
Yes! In Preorder (Root -> Left -> Right), rules say: "Root ko dekhte hi print kar do, fir Left jao."
Toh jab hum pehli baar kisi node par aayenge aur uska thread (link) banayenge, hum usko usi waqt print kar denge!

🏃 Dry Run (Preorder on 1 -> Left: 2 (Left: 4, Right: 5(Right: 6)), Right: 3):

cur = 1: Left hai. Thread banao 5 -> 1. Print 1. Move cur = 2.

cur = 2: Left hai. Thread banao 4 -> 2. Print 2. Move cur = 4.

cur = 4: Left NAHI hai. Print 4. Move cur = right (which is 2 via thread).

cur = 2: Thread already bana hai. Link todo. Move cur = 5.

cur = 5: Left NAHI hai. Print 5. Move cur = right (which is 6).

cur = 6: Left NAHI hai. Print 6. Move cur = right (which is 1 via thread).

cur = 1: Thread already bana hai. Link todo. Move cur = 3.

cur = 3: Left NAHI hai. Print 3. cur becomes NULL. End.
(Result: 1, 2, 4, 5, 6, 3)

📝 Thread 11: Vertical Order Traversal (LeetCode 987)
🧑‍💼 Interviewer: In Vertical Order Traversal, why do we use a multiset inside our map? Like map<int, map<int, multiset<int>>>. Why sort them?

🗣️ Candidate:

Map structure is: map<vertical_x, map<level_y, multiset<nodes>>>.

Hum multiset isliye use karte hain kyunki ek hi exact (x, y) coordinate par 2 ya usse zyada nodes overlap kar sakte hain!

Example: Agar node A aur node B dono ka x = 0 aur y = 2 hai, toh question explicitly kehta hai ki unko value ke hisaab se ascending order mein dalna hai.

multiset C++ mein inherently sorted hota hai, aur duplicate values bhi allow karta hai. Toh humein manually sort karne ki zarurat nahi padti, woh automatic handle kar leta hai.

📝 Thread 12: Root to Leaf Paths (LeetCode 257) - Why Backtrack?
🧑‍💼 Interviewer: In your DFS for all paths, why do you do path.pop_back() at the end of the function?

🗣️ Candidate:
Because we are passing the vector<int>& path by reference (to save memory, strictly O(H) space instead of creating new vectors everywhere).
Since there is only one path vector shared across all recursion calls:

Hum left branch mein jaate hain aur node add karte hain.

Jab humara left branch ka kaam khatam ho jata hai aur hum wapas upar aate hain (to explore the right branch), agar humne last node remove nahi kiya (pop_back), toh left branch ka kachra right branch ke answer mein mix ho jayega!

Isliye wapas upar aate waqt step wapas lena padta hai -> Backtracking.

📝 Thread 13: Validate BST (LeetCode 98)
🧑‍💼 Interviewer: Explain your iterative stack approach to validate a BST.

🗣️ Candidate:
The core property of a Binary Search Tree is: An Inorder Traversal (Left, Root, Right) of a valid BST will ALWAYS yield a strictly increasing sequence.

My stack simulates this inorder traversal.

I go as far left as possible, pushing to the stack.

Then I pop (t), and compare it with the prev node I visited.

If t->val <= prev->val, the strictly increasing rule is broken, so it's false!

Then I make prev = t and move to t->right.

📝 Thread 14: Construct Binary Tree (LeetCode 105, 106)
🧑‍💼 Interviewer: Can you construct a unique binary tree using just Preorder and Postorder arrays? What about Inorder + Postorder?

🗣️ Candidate:

Preorder + Postorder: No, we cannot construct a unique tree (unless every node has either 0 or 2 children). Preorder gives root first, Postorder gives root last, but neither tells us the boundary between the left and right subtrees!

Inorder + Postorder: YES!

Postorder array hamesha bata dega ki Root kaunsa hai (woh hamesha array ka aakhri element hoga).

Hum us root ko Inorder array mein dhoondhenge.

Inorder mein us root ke left wale saare elements Left Subtree hain, aur right wale saare elements Right Subtree hain.

We recursively repeat this process, picking the next root from the end of Postorder.

Bhai, yeh Kth Smallest in BST wala question toh Amazon aur baaki top companies ka ek aur classic hai! Iterative stack se karna isko sabse best tarika hota hai kyunki isme "Inorder traversal" ka asli mechanism samajh aata hai.

Tera diya hua code ekdam perfect hai. Isko main baaki threads ke style mein format kar deta hoon, direct wahi se copy-paste maar lena. Tera Tree ka module ab aur strong ho gaya!

📝 Thread 15: Kth Smallest Element in a BST (LeetCode 230)
🧑‍💼 Interviewer: Given the root of a Binary Search Tree (BST) and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.

🗣️ Candidate:
The most important property of a BST is that its Inorder Traversal (Left -> Root -> Right) always yields elements in strictly sorted (ascending) order.

Brute Force O(N) Space: Pura inorder traversal karo, saare elements ek array mein daalo, aur array ka [k-1]th element return kar do.

Better Approach O(H) Space: Pura array banane ki zarurat nahi hai. Hum ek iterative Inorder traversal karenge aur nodes ko visit karte waqt apna k count decrease karenge. Jaise hi k == 0 hoga, wahi humara answer hai!

🧑‍💼 Interviewer: Interesting. Why use an iterative Stack instead of Recursion here? Can you explain the exact logic of how your stack moves?

🗣️ Candidate:
Recursion is fine, but an Iterative Stack gives us exact manual control over the traversal. We can stop immediately and return the value the moment we find it, avoiding unnecessary recursive returns.

💡 In-Depth Logic & Dry Run:

Go Extreme Left: Hum tree ke sabse chote element se shuruat karna chahte hain. Toh pehle hum continuously left jaate hain aur saare nodes ko stack mein dalte rehte hain, jab tak NULL na aa jaye. (Stack ke top pe ab tree ka sabse chota element hai).

Process the Node: Stack se pop karo. Yeh humara current smallest element hai. Hum k-- karenge.

Main Logic: Agar k == 0 ho gaya, matlab humein humara target mil gaya! Wahi se return maar do.

Move to Right Subtree: Agar target nahi mila, toh logically ab agla bada element is current node ke right subtree mein hoga. Toh hum T = T->right chale jayenge.

Repeat Extreme Left: Agar right mein gaye hain, toh us right subtree ka bhi sabse chota element (extreme left) dhoondhna padega! Toh wapas left-left jaate hue push karenge.

💻 Optimal Code (Iterative O(H) Space):

C++

class Solution {
public:
    int kthSmallest(TreeNode* root, int k) {
        stack<TreeNode*> stack;
        TreeNode* T = root;
        
        // Step 1: Pehle extreme left tak jao (Find the smallest element)
        while (T != NULL) {
            stack.push(T);
            T = T->left;
        }
        
        // Step 2: Stack process karo
        while (!stack.empty()) {
            T = stack.top();
            stack.pop();
            
            // ---> MAIN LOGIC <---
            k--; 
            if (k == 0) {
                // Jaise hi k zero hua, answer mil gaya!
                return T->val; 
            }
            // ---------------------
            
            T = T->right;
            // Step 3: Agar right gaya hai, toh uske bhi extreme left tak jao
            while (T != NULL) {
                stack.push(T);
                T = T->left;
            }
        }
        return -1; 
    }
};
Bhai, is code ka jo comment pattern tune rakha hai (---> MAIN LOGIC <---), yeh actual interviews mein whiteboarding ke time bohot solid impact dalta hai kyunki yeh interviewer ko seedha core logic pe focus karwata hai.