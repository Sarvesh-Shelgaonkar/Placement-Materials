1. All Nodes Distance K in Binary Tree (The "Ancestor" Problem)Jab hume tree mein "upar" (parent ki taraf) jaana hota hai, toh Binary Tree mein uska rasta nahi hota. Isliye hume Parent Pointers ki zarurat padti hai.The Logic (Interview Version)Step 1 (Mapping): Ek BFS chalao aur har node ka parent store kar lo ek unordered_map<Node*, Node*> mein.Step 2 (Radial BFS): Target node se BFS shuru karo. Ab har node ke paas 3 raste hain:Left childRight childParent (jo humne map se nikala)Step 3 (Distance): Ek visited set rakho taki loop mein na faso. Jaise hi level k par pahuncho, queue ke saare elements tumhara answer hain.Optimal C++ CodeC++class Solution {
public:
    void markParents(TreeNode* root, unordered_map<TreeNode*, TreeNode*>& parent_track) {
        queue<TreeNode*> q;
        q.push(root);
        while(!q.empty()) {
            TreeNode* current = q.front(); q.pop();
            if(current->left) {
                parent_track[current->left] = current;
                q.push(current->left);
            }
            if(current->right) {
                parent_track[current->right] = current;
                q.push(current->right);
            }
        }
    }

    vector<int> distanceK(TreeNode* root, TreeNode* target, int k) {
        unordered_map<TreeNode*, TreeNode*> parent_track;
        markParents(root, parent_track);

        unordered_map<TreeNode*, bool> visited;
        queue<TreeNode*> q;
        q.push(target);
        visited[target] = true;
        int curr_level = 0;

        while(!q.empty()) {
            if(curr_level++ == k) break;
            int size = q.size();
            for(int i=0; i<size; i++) {
                TreeNode* current = q.front(); q.pop();
                // 1. Check Left
                if(current->left && !visited[current->left]) {
                    q.push(current->left);
                    visited[current->left] = true;
                }
                // 2. Check Right
                if(current->right && !visited[current->right]) {
                    q.push(current->right);
                    visited[current->right] = true;
                }
                // 3. Check Parent (The trick!)
                if(parent_track[current] && !visited[parent_track[current]]) {
                    q.push(parent_track[current]);
                    visited[parent_track[current]] = true;
                }
            }
        }
        vector<int> result;
        while(!q.empty()) {
            result.push_back(q.front()->val);
            q.pop();
        }
        return result;
    }
};
2. Median from Data Stream (Two Heaps)Bhai, tera code logic sahi tha, bas ek chhoti si galti thi findMedian ke math mein. (maxHeap.top() + minHeap.top()) / 2.0 hona chahiye, tune sirf minHeap.top() ko divide kar diya tha.Why Two Heaps? (Feel ke saath)Max-Heap (Left side): Saare chhote elements yahan rahenge. Iska top() left half ka sabse bada element hoga.Min-Heap (Right side): Saare bade elements yahan rahenge. Iska top() right half ka sabse chhota element hoga.Balance Rule: Dono ke top elements median ke sabse kareeb hote hain!Fixed Code (C++)C++class MedianFinder {
public:
    priority_queue<int> maxHeap; // Left Half
    priority_queue<int, vector<int>, greater<int>> minHeap; // Right Half

    void addNum(int num) {
        // Step 1: Push to maxHeap first
        maxHeap.push(num);
        
        // Step 2: Make sure left max <= right min
        minHeap.push(maxHeap.top());
        maxHeap.pop();
        
        // Step 3: Rebalance (maxHeap can have 1 extra element)
        if (maxHeap.size() < minHeap.size()) {
            maxHeap.push(minHeap.top());
            minHeap.pop();
        }
    }
    
    double findMedian() {
        if (maxHeap.size() > minHeap.size()) {
            return maxHeap.top();
        }
        // Galti yahan thi: Brackets are important!
        return (maxHeap.top() + minHeap.top()) / 2.0;
    }
};
3. Interview Tips: How to explain at Amazon?Jab interviewer puche, toh aise flow rakhna:Brute Force: "Pehle main har naye element par sort karunga ($O(N \log N)$), but stream mein ye slow ho jayega."Better Approach: "Main Insertion Sort ka idea use kar sakta hoon ($O(N)$), par optimal ke liye Heaps best hain."Optimal: "Main do heaps use karunga—Max-Heap chhote elements ke liye aur Min-Heap bade elements ke liye. Isse median $O(1)$ mein mil jayega aur insertion $O(\log N)$ hoga."

3. Multi-Source BFS (Rotten Oranges & Number of Islands)Jab hume grid mein chaaron dishaon (Up, Down, Left, Right) mein ek saath failna hota hai, tab hum Multi-Source BFS aur ek Global Direction Array ka use karte hain.The Global Direction Array TrickBar-bar if-else likhne se bachne ke liye hum ek array bana lete hain:C++// {row_change, col_change} for {Up, Down, Left, Right}
vector<pair<int, int>> directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

// Loop mein aise use karte hain:
for(auto dir : directions) {
    int new_row = current_row + dir.first;
    int new_col = current_col + dir.second;
    // Check bounds aur condition
}
A. Rotten Oranges (Multi-Source BFS)Kyu Multi-Source? Kyunki starting mein ek se zyada oranges pehle se sadhe hue (rotten) ho sakte hain. Wo sab ek saath aas-paas ke oranges ko sadayenge.Logic: Queue mein saare initially rotten oranges daal do. Level-by-level BFS chalao aur minute count karo.B. Number of Islands (DFS vs BFS)Logic: Pura grid traverse karo. Jaise hi 1 (land) mile, wahan se DFS/BFS call kardo aur uss pure island ko 0 (visited) mark kardo taki wo dubara count na ho.Interview Tip: "Hum isme DFS aur BFS dono use kar sakte hain. Dono ki Time Complexity $O(V+E)$ yaani $O(M \times N)$ hai. Par DFS likhne mein thoda chhota aur clean hota hai (using recursion)."4. Course Schedule & Kahn's Algorithm (Topological Sort)Jab bhi "Course A karne se pehle Course B karna padega" (Dependencies) jaisa sawal aaye, wahan Topological Sort lagta hai. Iska sabse best tarika hai Kahn's Algorithm.Kahn's Algorithm (Easy Explanation)In-degree nikalo: Har node par kitne arrows aa rahe hain (kitni dependencies hain) wo count karo.Queue mein daalo: Jinki in-degree 0 hai (jo courses bina kisi dependency ke kiye ja sakte hain), unhe Queue mein push karo.Process karo: Queue se node nikalo, aur uske padosiyon (neighbors) ki in-degree -1 kardo. Agar kisi padosi ki in-degree 0 ho jaye, toh usey Queue mein daal do.Cycle Detection (Exampl ke saath)Kahn's algo cycle detect karne ke liye best hai.Logic: Agar Queue se pop kiye gaye nodes ka count Total Nodes ke barabar nahi hai, iska matlab graph mein Cycle hai (Deadlock hai).Example (Cycle):Course 1 ke liye Course 2 chahiye.Course 2 ke liye Course 3 chahiye.Course 3 ke liye Course 1 chahiye.Sabki In-degree 1 hogi. Queue mein koi 0 in-degree wala jayega hi nahi. Queue empty rahegi, ans 0 aayega, jo total nodes (3) ke equal nahi hai $\rightarrow$ Cycle Detected!5. Longest Palindromic SubstringInterview Flow (What to say)Brute Force: "Main saari substrings generate karunga aur har ek ko check karunga ki wo palindrome hai ya nahi. Time Complexity $O(N^3)$ hogi."Optimal (Expand Around Center): "Main har character ko 'Center' maan kar dono taraf (left aur right) expand karunga jab tak characters match karte hain. Isse space $O(1)$ aur time $O(N^2)$ ho jayega."The "Odd vs Even" Length CatchPalindromes do tarah ke hote hain, isliye max check lagana padta hai:Odd Length: Center ek character hota hai (eg: a b a). Center b se shuru karo.Even Length: Center do characters ke beech mein hota hai (eg: a b b a). Center bb se shuru karo.C++// Optimal Logic Snippet
int expandAroundCenter(string s, int left, int right) {
    while (left >= 0 && right < s.length() && s[left] == s[right]) {
        left--;
        right++;
    }
    return right - left - 1; // Length of palindrome
}
// Hum odd (i, i) aur even (i, i+1) dono ke liye expand karte hain aur max length lete hain.
6. Tree Traversals (Print Down & Preorder)Jab bhi DFS call left aur right dono taraf lagti hai, aur root/current node ka kaam call lagne se pehle hota hai, usey Preorder Traversal kehte hain.Order: Root $\rightarrow$ Left $\rightarrow$ RightExample (1, 2, 3, 4, 5, 6, 7):Root 1 print hoga.Left subtree mein jayega: 2 print hoga, fir uska left 4, fir uska right 5.Fir 1 ke Right subtree mein aayega: 3 print hoga, fir uska left 6, fir uska right 7.Output: 1, 2, 4, 5, 3, 6, 77. Race Car (Hard Problem - Shortest Path)Yeh problem dekhne mein DP lagti hai, par actual mein ye ek Unweighted Graph mein Shortest Path ka sawal hai. Isliye isme BFS (Queue) lagta hai.State kaise track hoti hai: (position, speed)The $2^N - 1$ Logic Kya Hai?Jab tu lagaataar A (Accelerate) dabata hai, teri speed har step mein double hoti hai.Step 1: speed 1, move 1 $\rightarrow$ pos = 1Step 2: speed 2, move 2 $\rightarrow$ pos = 1+2 = 3Step 3: speed 4, move 4 $\rightarrow$ pos = 3+4 = 7Mathematical formula: Agar tu n baar accelerate karta hai, teri position $2^n - 1$ ho jati hai. (Eg: 3 baar A $\rightarrow 2^3 - 1 = 7$).Dry Run (Target = 6)Hume 6 par pahunchna hai. Hum BFS queue level by level check karenge. Sabse chhota rasta 5 steps ka hai: A A A R AStart: Position = 0, Speed = 1Move 1 (A): Pos = 0 + 1 = 1, Speed = 1 * 2 = 2Move 2 (A): Pos = 1 + 2 = 3, Speed = 2 * 2 = 4Move 3 (A): Pos = 3 + 4 = 7, Speed = 4 * 2 = 8 (Oops, 6 ko cross kar gaye! Ab gaadi ghumani padegi)Move 4 (R - Reverse): Pos wahi rahegi 7. Speed positive thi, toh Reverse karne par Speed ban jayegi -1.Move 5 (A): Pos = 7 + (-1) = 6. Speed = -1 * 2 = -2.Target 6 reached in 5 steps! Yehi BFS ka kamaal hai, wo har rasta check karta hai aur jo sabse pehle target tak pahunche, wahi shortest hota hai.