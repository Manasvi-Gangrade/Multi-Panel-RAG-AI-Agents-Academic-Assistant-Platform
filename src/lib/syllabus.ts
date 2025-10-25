export interface SyllabusUnit {
  number: number;
  title: string;
  contents: string;
  keyKeywords: string[];
  sampleQuestions: {
    question: string;
    answer: string;
  }[];
}

export interface SyllabusSubject {
  code: string;
  name: string;
  category: "Core" | "Departmental Elective" | "Open Elective";
  objectives: string[];
  outcomes: string[];
  units: SyllabusUnit[];
  textbooks: string[];
  references: string[];
}

export const RGPVSyllabus: SyllabusSubject[] = [
  {
    code: "AL-501",
    name: "Operating Systems",
    category: "Core",
    objectives: [
      "To make students understand the importance and overall functioning of an Operating System",
      "To acquaint the students with the concepts and principles that underlie the modern Operating Systems, and to provide them an insight in the working of its various modules."
    ],
    outcomes: [
      "Get clear understanding about the need and objectives of an Operating System and various services provided by the Operating Systems.",
      "Gain a detailed knowledge about the functions of different modules of an Operating System, viz. process management, file system management, memory management, device management etc.",
      "Visualize the internal implementation of various modules of Operating System and correlate the same with the actual implementation of these modules in Unix/Linux and other contemporary Operating Systems.",
      "Acquire the ability to design and implement small modules of Operating System, Shell and Commands, using system calls of Unix/Linux or some educational Operating System."
    ],
    textbooks: [
      "Silberschatz, Galvin, Gagne, 'Operating System Concepts', John Wiley & Sons.",
      "William Stalling, 'Operating Systems: Internals and Design Principles', Pearson."
    ],
    references: [
      "Andrew S. Tanenbaum, 'Modern Operating Systems', Prentice Hall.",
      "Robert Love, 'Linux Kernel Development', Pearson.",
      "Maurice J. Bach, 'The Design of Unix Operating System', Pearson.",
      "Bovet & Cesati, 'Understanding the Linux Kernel', O'Reilly."
    ],
    units: [
      {
        number: 1,
        title: "Introduction to Operating Systems & OS Services",
        contents: "Function, Evolution, Different types of Operating Systems, Desirable Characteristics and features of an O/S. Operating Systems Services: Types of Services, Different ways of providing these Services– Commands, System Calls. Need of System Calls, Low level implementation of System Calls, Portability issue, Operating System Structures.",
        keyKeywords: ["System Calls", "OS Structures", "OS Evolution", "Monolithic Kernel", "Microkernel"],
        sampleQuestions: [
          {
            question: "What is a System Call? Why is it needed in modern Operating Systems?",
            answer: "A System Call is the programmatic interface provided by an Operating System to user-level programs, allowing them to request services from the OS kernel (such as file operations, hardware access, or process creation). System Calls are crucial for security and integrity because they act as gatekeepers, enforcing transitions from user mode to kernel mode (via hardware interrupts/traps) so user programs cannot directly access hardware or crash other processes."
          },
          {
            question: "Explain the low-level implementation of a System Call.",
            answer: "At a low level, system call execution involves: (1) Storing system call parameters in CPU registers or stack. (2) Invoking a software interrupt or specialized instruction (e.g., 'int 0x80' in Linux x86 or 'syscall'). (3) The CPU shifts mode from User Mode (Ring 3) to Kernel Mode (Ring 0). (4) The CPU indexes the System Call Table to find the handler address matching the requested call ID. (5) The kernel executes the service, puts the return code in a designated register, and returns to user space via 'sysexit' or 'iret'."
          }
        ]
      },
      {
        number: 2,
        title: "File Systems (Secondary Storage Management)",
        contents: "File Concept, User’s and System Programmer’s view of File System, Hard Disk Organization, Disk Formatting and File System Creation, Different Modules of a File System, Disk Space Allocation Methods – Contiguous, Linked, Indexed. Disk Partitioning and Mounting; Directory Structures, File Protection; Virtual and Remote File Systems. Case Studies of File Systems being used in Unix/Linux & Windows; System Calls used in these Operating Systems for file management.",
        keyKeywords: ["Contiguous Allocation", "Indexed Allocation", "Hard Disk Organization", "Mounting", "Virtual File System", "inode"],
        sampleQuestions: [
          {
            question: "Compare Contiguous, Linked, and Indexed disk space allocation methods.",
            answer: "1. Contiguous: Files are allocated sequentially. Pros: Extremely fast read/write speeds. Cons: Causes external fragmentation and requires knowing file size in advance. 2. Linked: Blocks are scattered; each block points to the next. Pros: No external fragmentation, easy file growth. Cons: Slow sequential/random access, pointers consume space. 3. Indexed: An index block contains pointers to all file blocks. Pros: Supports efficient random access and has no external fragmentation. Cons: Index block overhead for small files."
          },
          {
            question: "Explain the role of the Virtual File System (VFS) in Linux.",
            answer: "The Virtual File System (VFS) acts as an abstraction layer inside the Linux kernel. It defines common file operations (like open, read, write) in a generic format using structures like inodes and file operation tables. This allows user programs to access different underlying file systems (like ext4, FAT, NTFS, NFS) seamlessly using the same set of system calls, without needing to know the low-level format of each device."
          }
        ]
      },
      {
        number: 3,
        title: "Process Management & Concurrency Control",
        contents: "Concept of a process, Process State Diagram, Different type of schedulers, CPU scheduling algorithms, Evaluation of scheduling algorithms, Concept of Threads: User level & Kernel level Threads, Thread Scheduling; Multiprocessor/Multicore Processor Scheduling. Case Studies of Process Management in Unix/Linux & Windows; System Calls used in these Operating Systems for Process Management. Concurrency & Synchronization: Real and Virtual Concurrency, Mutual Exclusion, Synchronization, Critical Section Problem, Solution to Critical Section Problem: Mutex Locks; Monitors; Semaphores, WAIT/SIGNAL operations and their implementation; Classical Problems of Synchronization; Inter-Process Communication. Deadlocks: Deadlock Characterization, Prevention, Avoidance (Banker's Algorithm), Recovery.",
        keyKeywords: ["CPU Scheduling", "Critical Section", "Semaphores", "Deadlocks", "Banker's Algorithm", "Mutex", "WAIT/SIGNAL"],
        sampleQuestions: [
          {
            question: "Explain the four necessary conditions for a Deadlock to occur.",
            answer: "A deadlock can occur if and only if these four conditions hold simultaneously: (1) Mutual Exclusion: At least one resource must be held in a non-shareable mode. (2) Hold and Wait: A process must hold at least one resource and wait for others. (3) No Preemption: Resources cannot be forcibly taken from a process. (4) Circular Wait: A closed chain of processes exists where each process holds resources wanted by the next."
          },
          {
            question: "What is a Semaphore? Differentiate between Binary and Counting Semaphores with WAIT/SIGNAL implementations.",
            answer: "A Semaphore is a protected integer variable used for synchronization. It is accessed via two atomic operations: wait() (or P) and signal() (or V). Binary Semaphores have value 0 or 1 (used for mutual exclusion like mutexes). Counting Semaphores can have arbitrary positive values representing available resources. Wait() decrements the value; if negative, the process blocks. Signal() increments the value; if value is <= 0, it wakes up a blocked process."
          }
        ]
      },
      {
        number: 4,
        title: "Memory Management & Virtual Memory",
        contents: "Different Memory Management Techniques – Contiguous allocation; Non-contiguous allocation: Paging, Segmentation, Paged Segmentation; Comparison of these techniques. Virtual Memory – Concept, Overlay, Dynamic Linking and Loading, Implementation of Virtual Memory by Demand Paging etc.; Memory Management in Unix/Linux & Windows.",
        keyKeywords: ["Paging", "Segmentation", "Demand Paging", "Virtual Memory", "Page Replacement", "Overlays"],
        sampleQuestions: [
          {
            question: "Differentiate between Paging and Segmentation memory management techniques.",
            answer: "1. Paging: Memory is divided into fixed-size physical blocks (frames) and logical blocks (pages). It avoids external fragmentation but suffers from internal fragmentation within pages. It is invisible to the user. 2. Segmentation: Logical space is divided into variable-sized units (segments) based on semantic divisions (code, stack, heap). It avoids internal fragmentation but causes external fragmentation. It is visible to the user/compiler."
          },
          {
            question: "Explain Demand Paging and how Page Faults are handled.",
            answer: "Demand Paging loads pages into physical memory only when they are referenced. When a program references an unloaded page, the CPU encounters a Page Fault: (1) The OS traps to kernel mode. (2) It checks if the address is valid in virtual memory. (3) The OS locates the page on disk. (4) It finds a free frame in physical memory (or runs a replacement algorithm like LRU if full). (5) It reads the page from disk into the frame. (6) It updates the page table (sets present bit). (7) It restarts the instruction."
          }
        ]
      },
      {
        number: 5,
        title: "Input/Output Management & Security Issues",
        contents: "Overview of Mass Storage Structures, Disk Scheduling (FCFS, SSTF, SCAN, C-SCAN, LOOK, C-LOOK); I/O Systems: Different I/O Operations- Program Controlled, Interrupt Driven, Concurrent I/O, Synchronous/Asynchronous and Blocking/Non-Blocking I/O Operations, I/O Buffering, Application I/O Interface, Kernel I/O Subsystem, Transforming I/O requests to hardware operations. Overview of Protection & Security Issues and Mechanisms; Introduction to Multiprocessor, Real Time, Embedded and Mobile Operating Systems; Overview of Virtualization.",
        keyKeywords: ["Disk Scheduling", "SCAN", "Interrupt-Driven I/O", "Non-Blocking I/O", "RTOS", "Virtualization"],
        sampleQuestions: [
          {
            question: "Explain SSTF and SCAN disk scheduling algorithms with their merits.",
            answer: "1. SSTF (Shortest Seek Time First): Selects the request closest to the current head position. Pros: Improves throughput and reduces head movement. Cons: Can cause starvation for distant requests. 2. SCAN (Elevator Algorithm): Head moves back and forth across the disk surface, servicing requests along the way. Pros: Starvation-free, fairer response time. Cons: Requests just behind the head have to wait until it sweeps back."
          },
          {
            question: "Differentiate between Blocking and Non-blocking I/O operations.",
            answer: "1. Blocking I/O: Execution of the calling thread is suspended (put in sleep state) until the I/O operation completes and data is copied to the buffer. 2. Non-blocking I/O: The call returns immediately. If data is not ready, it returns an error or status code (like EAGAIN), allowing the process to do other work and poll later, or use event-based notification (asynchronous I/O)."
          }
        ]
      }
    ]
  },
  {
    code: "AL-502",
    name: "Database Management Systems",
    category: "Core",
    objectives: [
      "To enable students in developing a high level understanding of the concepts of Database management systems in contrast with traditional data management systems",
      "To emphasize skills to apply database concepts in building, maintaining and retrieving data from these DBMS."
    ],
    outcomes: [
      "Describe design of a database at various levels and compare and contrast traditional data processing with DBMS.",
      "Design a database using Entity Relationship diagram and other design techniques.",
      "Apply fundamentals of relational model to model and implement a sample Database Management System for a given domain.",
      "Evaluate and optimize queries and apply concepts of transaction management."
    ],
    textbooks: [
      "Korth H.F. & Silberschatz A., Sudarshan, 'Database Systems', McGraw-Hill",
      "Chris J. Date, with Hugh Darwin, Addison-Wesley, 'A Guide to SQL Standard'.",
      "Elmasri R., Navathe S.B., 'Fundamentals of Database Systems', Pearson."
    ],
    references: [
      "Rob, 'Database System: Design Implementation & Management', Cengage Learning.",
      "Atul Kahate, 'Introduction to Database Management System', Pearson Educations",
      "Oracle 9i Database Administration Fundamental-I, Volume I, Oracle Press, TMH."
    ],
    units: [
      {
        number: 1,
        title: "DBMS Concepts, Architecture and ER Modeling",
        contents: "Introduction, Database approach v/s Traditional file accessing approach, Advantages of database systems, Data models, Schemas and instances, Data independence, Data Base Language and interfaces, Overall Database Structure, Functions of DBA and designer, ER data model: Entitles and attributes, Entity types, Defining the E-R diagram, Concept of Generalization, Aggregation and Specialization. Transforming ER diagram into the tables. Various other data models: object oriented, Network, and Relational models, Comparison. Storage structures, Hashing & Indexing: Single level & multilevel indices.",
        keyKeywords: ["ER Diagram", "Generalization", "Specialization", "Aggregation", "Data Independence", "DBA", "Multilevel Indices"],
        sampleQuestions: [
          {
            question: "Explain the difference between Specialization, Generalization, and Aggregation in ER modeling.",
            answer: "1. Specialization: Top-down design process where sub-classes are created from a super-class based on specific attributes (e.g. specialized entities 'Student' and 'Teacher' from 'Person'). 2. Generalization: Bottom-up process where common features of multiple low-level entities are combined into a high-level entity. 3. Aggregation: An abstraction where relationships between entities are treated as higher-level entities, allowing relationships to form associations with other entities."
          },
          {
            question: "Differentiate between Physical and Logical Data Independence.",
            answer: "1. Logical Data Independence: The ability to modify the conceptual schema (logical design) without changing the external schema or existing user application programs. 2. Physical Data Independence: The ability to change the physical storage structures (like indexes, hashing) without having to modify the conceptual or logical schema."
          }
        ]
      },
      {
        number: 2,
        title: "Relational Data Models & Query Languages (SQL, Algebra)",
        contents: "Domains, Tuples, Attributes, Relations, Characteristics of relations, Keys, Key attributes of relation, Relational database, Schemas, Integrity constraints. Referential integrity, Intension and Extension, Relational Query languages: SQL- DDL, DML, integrity constraints, Complex queries, various joins, indexing, triggers, assertions, Relational algebra and relational calculus, Relational algebra operations like select, Project, Join, Division, outer union. Types of relational calculus: Tuple oriented and domain oriented relational calculus.",
        keyKeywords: ["Referential Integrity", "Relational Algebra", "Relational Calculus", "Triggers", "Assertions", "Division Operation"],
        sampleQuestions: [
          {
            question: "Explain Referential Integrity Constraints with an example.",
            answer: "Referential Integrity ensures that relationships between tables remain consistent. It dictates that a foreign key value in a child table must exist as a primary key value in the parent table, or be NULL. For example, if a table 'Enrollment' has a column 'StudentID' pointing to the primary key of 'Students', referential integrity prevents inserting an enrollment for a non-existent student, and controls what happens if a student is deleted (e.g., ON DELETE CASCADE)."
          },
          {
            question: "Explain the Division (/) operation in Relational Algebra.",
            answer: "The Division operation (R ÷ S) is used for queries involving 'all' or 'every'. For instance, 'find students who have registered for all courses in semester 5'. R ÷ S returns tuples in R that are associated with all tuples in S. Formally, it yields tuples t such that for every tuple s in S, the concatenated tuple t·s is present in relation R."
          }
        ]
      },
      {
        number: 3,
        title: "Database Design & Normalization & Query Optimization",
        contents: "Introduction to normalization, Normal forms- 1NF, 2NF, 3NF and BCNF, Functional dependency, Decomposition, Dependency preservation and lossless join, problems with null valued and dangling tuples, multivalued dependencies. Query Optimization: Introduction, steps of optimization, various algorithms to implement select, project and join operations, optimization methods: heuristic based, cost estimation based.",
        keyKeywords: ["BCNF", "3NF", "Lossless Join", "Functional Dependency", "Query Optimization", "Heuristic Optimization"],
        sampleQuestions: [
          {
            question: "Why is BCNF strictly stronger than 3NF? Give a structural comparison.",
            answer: "A relation is in 3NF if for every functional dependency X -> A, either X is a superkey, or A is a prime attribute. BCNF (Boyce-Codd Normal Form) eliminates the second condition: for every functional dependency X -> A, X MUST be a superkey. BCNF resolves redundancies that 3NF allows when there are overlapping composite candidate keys."
          },
          {
            question: "Explain the steps of Query Optimization inside a DBMS.",
            answer: "Query optimization translates a high-level query (SQL) into an efficient execution plan: (1) Parsing and Translation: SQL is verified and converted into a relational algebra expression (Query Tree). (2) Heuristic Optimization: Rules are applied to reduce intermediate relation sizes (e.g. pushing 'Select' and 'Project' operations down the tree). (3) Cost Estimation: Estimating costs of alternative physical execution plans using catalog stats (cardinality, index availability) and selecting the plan with the lowest CPU/IO cost."
          }
        ]
      },
      {
        number: 4,
        title: "Transaction Processing & Concurrency Control",
        contents: "Transaction System, Testing of Serializability, Serializability of schedules, conflict & view serializable schedule, recoverability, Recovery from transaction failures. Log based recovery. Checkpoints deadlock handling. Concurrency Control Techniques: Concurrency Control, locking Techniques, timestamping protocols, validation based protocol, multiple granularity. Multi version schemes, Recovery with concurrent transaction. Distributed databases, OODBMS Vs DBMS, Web & Mobile databases.",
        keyKeywords: ["Serializability", "Log-based Recovery", "Two-Phase Locking", "Timestamp Ordering", "Distributed Database"],
        sampleQuestions: [
          {
            question: "Explain the Conflict Serializability of a schedule and how to test for it.",
            answer: "A schedule is conflict serializable if it is conflict-equivalent to a serial schedule. Two operations conflict if they belong to different transactions, access the same data item, and at least one is a write. To test, construct a Precedence Graph: draw an edge from Ti to Tj if an operation of Ti conflicts with and occurs before an operation of Tj. If the graph contains no cycles, the schedule is conflict serializable."
          },
          {
            question: "Explain the Two-Phase Locking (2PL) protocol.",
            answer: "2PL ensures serializability by locking data items in two distinct phases: (1) Growing Phase: Transactions can acquire locks but cannot release any. (2) Shrinking Phase: Transactions can release locks but cannot acquire new ones. Standard 2PL guarantees serializability but can suffer from deadlocks. Strict 2PL (holding all exclusive locks until transaction commit/abort) prevents cascading rollbacks."
          }
        ]
      },
      {
        number: 5,
        title: "Relational Databases: Stored Procedures & Triggers",
        contents: "Case Study of Oracle/PostgreSQL/MySQL: Architecture, physical files, memory structures, background process. Data dictionary, dynamic performance view. Security, role management. Cursor management: nested and parameterized cursors. Stored procedures, triggers, mutating errors, instead of triggers.",
        keyKeywords: ["Stored Procedures", "Parameterized Cursors", "Mutating Errors", "Instead of Triggers", "Physical Files"],
        sampleQuestions: [
          {
            question: "What is a mutating table error in triggers, and how do you resolve it?",
            answer: "A mutating table error occurs in a row-level database trigger when the trigger attempts to query or modify the same table that is currently undergoing modification by the statement that fired the trigger. To resolve it, you can: (1) Re-write the logic as a statement-level trigger. (2) Use a temporary compound trigger (in Oracle) to collect modified IDs in an array during row-level execution, then query the table in the AFTER-STATEMENT block."
          },
          {
            question: "Explain the structure and benefits of Parameterized Cursors.",
            answer: "A parameterized cursor is a cursor that accepts arguments when it is opened. This allows you to write a single cursor declaration and reuse it in different parts of your stored procedure with different input filters (e.g. cursor for specific departments). It avoids hardcoding filter criteria, reduces compilation overhead, and optimizes memory usage inside PL/SQL engines."
          }
        ]
      }
    ]
  },
  {
    code: "AL-503(A)",
    name: "Information Retrieval",
    category: "Departmental Elective",
    objectives: [
      "Understand components, open-source search engines, and web architectures of modern IR system",
      "Learn retrieval models, crawling strategies, rank evaluations, and text classification/clustering."
    ],
    outcomes: [
      "Explain the fundamental components of Search Engines.",
      "Implement term weighting, vector models, and inverted indexes.",
      "Analyze link algorithms like PageRank and HITS.",
      "Apply clustering and classification algorithms to textual datasets."
    ],
    textbooks: [
      "C. Manning, P. Raghvan and H Schutze: 'Introduction to Information Retrieval', Cambridge University Press.",
      "Ricardo Baeza Yates and Berthier Ribeiro Neto, 'Modern Information Retrieval: The Concepts and Technology behind Search', ACM Press Books."
    ],
    references: [
      "Bruce Croft, Donald Metzler and Trevor Strohman, 'Search Engines: Information Retrieval in Practice', Addison Wesley.",
      "Mark Levene, 'An Introduction to Search Engines and Web Navigation', Wiley."
    ],
    units: [
      {
        number: 1,
        title: "Introduction to Information Retrieval & AI's Role",
        contents: "History of IR, Components of IR, Issues, Open source Search engine Frameworks, The Impact of the web on IR, The role of artificial intelligence (AI) in IR, IR Versus Web Search, Components of a search engine, Characterizing the web.",
        keyKeywords: ["IR Components", "Search Engine Frameworks", "AI in IR", "Web Search vs IR"],
        sampleQuestions: [
          {
            question: "Differentiate between classic Information Retrieval and Web Search.",
            answer: "Classic IR operates on closed, controlled, and homogeneous document spaces (like library catalogs) where documents are static, and users seek specific answers. Web Search operates on massive, decentralized, extremely dynamic, and adversarial (spam) web environments with hyperlinks, multi-format media, diverse languages, and requires hybrid ranking systems combining content and hyperlink analysis."
          }
        ]
      },
      {
        number: 2,
        title: "Boolean and Vector Space Retrieval Models",
        contents: "Boolean and Vector space retrieval models- Term weighting, TF-IDF weighting, cosine similarity, Preprocessing, Inverted indices, efficient processing with sparse vectors, Language Model based IR, Probabilistic IR, Latent Semantic indexing, Relevance feedback and query expansion.",
        keyKeywords: ["TF-IDF", "Cosine Similarity", "Inverted Index", "Latent Semantic Indexing", "Relevance Feedback"],
        sampleQuestions: [
          {
            question: "Explain the components of TF-IDF weighting and how it ranks documents.",
            answer: "TF-IDF (Term Frequency-Inverse Document Frequency) measures how important a word is to a document in a collection. (1) TF: measures term frequency in a document (more frequent = higher weight). (2) IDF: measures how common or rare a term is across all documents (log(Total Documents / Documents with term)). By multiplying TF by IDF, we give high weights to terms that are common in a specific document but rare overall, helping identify documents highly relevant to the query."
          }
        ]
      },
      {
        number: 3,
        title: "Web Search Architectures & Focused Crawling",
        contents: "Web search overview, web structure, user paid placement, search engine optimization, Web Search Architectures, crawling, meta-crawlers, Focused Crawling, web indexes, Near duplicate detection, Index Compression, XML retrieval.",
        keyKeywords: ["Focused Crawling", "SEO", "Near Duplicate Detection", "Index Compression", "Meta-crawlers"],
        sampleQuestions: [
          {
            question: "What is Focused Crawling? How does it differ from standard web crawling?",
            answer: "Focused Crawling (or topical crawling) is designed to download only web pages that are relevant to a pre-defined subject or topic, instead of indexing the entire web. It uses classifiers to score URLs based on predicted topical relevance before fetching, optimizing bandwidth and storage for subject-specific search portals."
          }
        ]
      },
      {
        number: 4,
        title: "Link Analysis, Searching, MapReduce & Evaluation",
        contents: "Link Analysis, hubs and authorities, Page Rank and HITS algorithms, Searching and Ranking, Relevance Scoring and ranking for Web, Similarity, Hadoop & Map Reduce, Evaluation, Personalized search, Collaborative filtering and content-based recommendation of documents and products, handling invisible Web, Snippet generation, Summarization, Question Answering, Cross-Lingual Retrieval.",
        keyKeywords: ["PageRank", "HITS", "Hubs and Authorities", "MapReduce", "Collaborative Filtering", "Snippet Generation"],
        sampleQuestions: [
          {
            question: "Explain the difference between PageRank and the HITS link analysis algorithms.",
            answer: "1. PageRank: Computes a single global static importance score for each page in a global link graph, based on the probability of a random surfer hitting the page. It is independent of the user's query. 2. HITS (Hyperlink-Induced Topic Search): Query-dependent algorithm that identifies two types of pages in a sub-graph: (a) Authorities (pages with high-quality content linked by many hubs), and (b) Hubs (pages pointing to many good authorities). It updates hub and authority scores iteratively."
          }
        ]
      },
      {
        number: 5,
        title: "Information Filtering & Text Mining",
        contents: "Information filtering: organization and relevance feedback, Text Mining, Text classification and clustering, Categorization algorithms (naive Bayes, decision trees and nearest neighbor), Clustering algorithms: agglomerative clustering, k-means, expectation maximization (EM).",
        keyKeywords: ["Naive Bayes Classifier", "K-Means Clustering", "Expectation Maximization", "Agglomerative Clustering"],
        sampleQuestions: [
          {
            question: "Explain the EM (Expectation-Maximization) algorithm for clustering.",
            answer: "The EM algorithm is a soft-clustering method that extends K-means using a mixture of probability distributions (like Gaussian Mixture Models). It iterates between two steps: (1) Expectation (E-step): Estimates the probability that each data point belongs to each cluster. (2) Maximization (M-step): Recalculates the cluster parameters (mean, variance, weight) using the assigned probabilities to maximize the likelihood of the data."
          }
        ]
      }
    ]
  },
  {
    code: "AL-503(B)",
    name: "Deep Learning",
    category: "Departmental Elective",
    objectives: [
      "Introduce deep learning fundamentals and major algorithms, problem settings, and practical neural networks.",
      "Explore computer vision (CNN), speech/text models (RNN, LSTM), generative architectures (GANs, RBMs)."
    ],
    outcomes: [
      "Describe the foundational theories and backpropagation in deep neural networks.",
      "Design and customize Convolutional Neural Networks (CNNs) for image recognition.",
      "Construct and optimize Recurrent Neural Networks (RNNs) and LSTMs for sequential text data.",
      "Leverage Generative Models like GANs and Autoencoders for real-world scenarios."
    ],
    textbooks: [
      "Ian Goodfellow, Yoshua Bengio and Aaron Courville; 'Deep Learning', MIT Press.",
      "Charu C. Aggarwal, 'Neural Networks and Deep Learning: A Textbook', Springer.",
      "Francois Chollet, 'Deep Learning with Python', Manning Publications."
    ],
    references: [
      "Aurelien Geon, 'Hands-On Machine Learning with Scikit-Learn and Tensorflow', O'Reilly.",
      "Andreas Muller, 'Introduction to Machine Learning with Python', O'Reilly.",
      "Adam Gibson, Josh Patterson, 'Deep Learning: A Practitioner's Approach', O'Reilly."
    ],
    units: [
      {
        number: 1,
        title: "Deep Learning Foundations, MLPs & FFNs",
        contents: "History of Deep Learning, McCulloch Pitts Neuron, Multilayer Perceptions (MLPs), Representation Power of MLPs, Sigmoid Neurons, Feed Forward Neural Networks, Back propagation, weight initialization methods, Batch Normalization, Representation Learning, GPU implementation, Decomposition – PCA and SVD.",
        keyKeywords: ["McCulloch Pitts", "Sigmoid Neuron", "Backpropagation", "Batch Normalization", "Representation Learning", "PCA", "SVD"],
        sampleQuestions: [
          {
            question: "Describe the Backpropagation algorithm in a Feedforward Neural Network.",
            answer: "Backpropagation is the central method for training neural networks. It computes the gradient of the loss function with respect to the network weights layer-by-layer: (1) Forward Pass: Compute activations and predictions. (2) Loss Calculation: Compare predictions with target labels. (3) Backward Pass: Use the chain rule of calculus to compute how much each weight contributed to the error, propagating gradients backward from the output layer to the input layer. (4) Optimization: Update weights using gradient descent."
          },
          {
            question: "What is Batch Normalization, and why does it accelerate deep training?",
            answer: "Batch Normalization scales and shifts the activations of a hidden layer across a mini-batch to have zero mean and unit variance. It combats 'internal covariate shift' (when input distributions to deep layers shift during updates). It stabilizes gradients, allows higher learning rates, and acts as a mild regularizer, significantly accelerating convergence."
          }
        ]
      },
      {
        number: 2,
        title: "Deep Optimizers & Advanced Autoencoders",
        contents: "Deep Feedforward Neural Networks, Gradient Descent (GD), Momentum Based GD, Nesterov Accelerated GD, Stochastic GD, AdaGrad, Adam, RMSProp, Auto-encoder, Regularization in auto-encoders, Denoising auto-encoders, Sparse auto-encoders, Contractive auto-encoders, Variational auto-encoder, Auto-encoders relationship with PCA and SVD, Dataset augmentation.",
        keyKeywords: ["Nesterov Accelerated GD", "Adam", "RMSProp", "Denoising Auto-encoder", "Variational Auto-encoder", "Data Augmentation"],
        sampleQuestions: [
          {
            question: "Compare RMSProp and Adam optimization techniques.",
            answer: "1. RMSProp: Solves AdaGrad's radical decay of learning rate by using an exponentially decaying average of squared historical gradients. It scales the updates of each weight inversely by the root-mean-square of its gradients. 2. Adam (Adaptive Moment Estimation): Combines both RMSProp (scaling by second moment) and Momentum (adding the first moment - exponentially decaying average of past gradients). It acts as a self-tuning optimizer, very robust for complex loss landscapes."
          },
          {
            question: "What is a Variational Autoencoder (VAE)? How does it differ from a standard Autoencoder?",
            answer: "A standard autoencoder compresses input into a discrete latent vector (bottleneck) to reconstruct the exact same input. It is deterministic. A Variational Autoencoder (VAE) is generative and probabilistic: instead of mapping inputs to a discrete point, it maps them to parameters of a probability distribution (mean and variance). It enforces a structured latent space (typically standard Gaussian via KL divergence loss) so you can sample new images from random noise."
          }
        ]
      },
      {
        number: 3,
        title: "Convolutional Neural Networks (CNNs) & Regularization",
        contents: "Introduction to Convolutional neural Networks (CNN) and its architectures, CCN terminologies: ReLu activation function, Stride, padding, pooling, convolutions operations, Convolutional kernels, types of layers: Convolutional, pooling, fully connected, Visualizing CNN, CNN examples: LeNet, AlexNet, ZF-Net, VGGNet, GoogLeNet, ResNet, RCNNetc. Deep Dream, Deep Art. Regularization: Dropout, drop Connect, unit pruning, stochastic pooling, artificial data, injecting noise in input, early stopping, Limit Number of parameters, Weight decay etc.",
        keyKeywords: ["Convolutions", "Pooling", "ReLU", "ResNet", "Dropout", "Early Stopping", "Weight Decay"],
        sampleQuestions: [
          {
            question: "Why are residual connections in ResNet highly effective? What problem do they solve?",
            answer: "ResNet introduces residual connections (or shortcut connections) that bypass one or more layers, performing an identity mapping F(x) + x. This solves the vanishing/exploding gradient problem in extremely deep networks (100+ layers) because gradients can flow directly backward through the skip connections during backpropagation without being degraded by consecutive multiplications."
          },
          {
            question: "Explain the mechanism of Dropout in CNNs.",
            answer: "Dropout is a powerful regularization technique. During each training iteration, it randomly deactivates (sets to zero) a fraction (e.g. 50%) of hidden units or activations. This prevents complex 'co-adaptations' of neurons where units rely heavily on specific neighbors, forcing the network to learn robust, generalized features. During inference, all units are active but scaled down by the dropout rate."
          }
        ]
      },
      {
        number: 4,
        title: "Deep Recurrent Neural Networks (RNNs) & Attention",
        contents: "Introduction to Deep Recurrent Neural Networks and its architectures, Backpropagation Through Time (BPTT), Vanishing and Exploding Gradients, Truncated BPTT, Gated Recurrent Units (GRUs), Long Short Term Memory (LSTM), Solving the vanishing gradient problem with LSTMs, Encoding and decoding in RNN network, Attention Mechanism, Attention over images, Hierarchical Attention, Directed Graphical Models. Applications of Deep RNN in Image Processing, Natural Language Processing, Speech recognition, Video Analytics.",
        keyKeywords: ["BPTT", "LSTM", "GRU", "Attention Mechanism", "Vanishing Gradient", "Encoder-Decoder"],
        sampleQuestions: [
          {
            question: "How does the LSTM architecture solve the Vanishing Gradient problem found in standard RNNs?",
            answer: "LSTMs introduce a 'Cell State' (C_t) that acts as an internal conveyor belt running straight down the chain, protected by three multiplicative gates: (1) Forget Gate: decides what information to discard. (2) Input Gate: decides what new info to store. (3) Output Gate: decides what to output. Because information can flow down the cell state with minimal linear updates, gradients can propagate backward through time without vanishing."
          },
          {
            question: "Explain the role and advantage of the Attention Mechanism in sequence models.",
            answer: "Traditional encoder-decoder RNNs compress the entire source sequence into a single fixed-length vector, creating a major information bottleneck for long sentences. The Attention Mechanism allows the decoder to 'look back' at all hidden states of the input sequence and focus dynamically on specific relevant words (via weighted similarity scores) when generating each target word."
          }
        ]
      },
      {
        number: 5,
        title: "Generative Models, GANs & RBMs",
        contents: "Introduction to Deep Generative Models, Restricted Boltzmann Machines (RBMs), Gibbs Sampling for training RBMs, Deep belief networks, Markov Networks, Markov Chains, Auto-regressive Models: NADE, MADE, PixelRNN, Generative Adversarial Networks (GANs), Applications of Deep Learning in Object detection, speech/ image recognition, video analysis, NLP, medical science etc.",
        keyKeywords: ["Restricted Boltzmann Machines", "Gibbs Sampling", "GANs", "Markov Chains", "Generative Adversarial Network"],
        sampleQuestions: [
          {
            question: "Explain the operational dynamic and minimax game of GANs (Generative Adversarial Networks).",
            answer: "A GAN consists of two neural networks competing in a zero-sum game: (1) Generator (G): tries to map random noise to realistic images to fool the discriminator. (2) Discriminator (D): tries to classify whether an image is real (from training set) or fake (from Generator). The training is formulated as a minimax game: min_G max_D V(D,G). As both train together, the Generator learns to synthesize highly realistic images."
          }
        ]
      }
    ]
  },
  {
    code: "AL-503(C)",
    name: "Optimization Techniques in Machine Learning",
    category: "Departmental Elective",
    objectives: [
      "Understand linear programming models (LPP) and simplex methods.",
      "Learn strategies for model deployment, responsible AI metrics, production planning, logging, and QUAM dashboard monitoring."
    ],
    outcomes: [
      "Formulate and solve Linear Programming Problems using the Simplex algorithm.",
      "Assess ML team readiness, experimental setups, and change communications.",
      "Recognize responsible AI, negative feedback loops, and optimization secondary effects.",
      "Build deployment strategies, complexity limits, and QUAM metrics monitoring."
    ],
    textbooks: [
      "Jeeva Jose, 'Introduction to Machine Learning', Khanna Book Publishing 2020.",
      "Rajiv Chopra, 'Machine Learning', Khanna Book Publishing 2021.",
      "Optimization for Machine Learning, Suvrit Sra, Sebastian Nowozin and Stephen J. Wright, MIT Press, 2011.",
      "Optimization in Machine Learning and Applications, Suresh Chandra Satapathy, Anand J. Kulkarni, Springer, 2019"
    ],
    references: [],
    units: [
      {
        number: 1,
        title: "Introduction to LPP & Basic Optimization Calculus",
        contents: "What is optimization, Formulation of LPP, Solution of LPP: Simplex method, Basic Calculus for optimization: Limits and multivariate functions, Derivatives and linear approximations: Singlevariate functions and multivariate functions.",
        keyKeywords: ["LPP Formulation", "Simplex Method", "Multivariate Functions", "Linear Approximations", "Gradient Descent Base"],
        sampleQuestions: [
          {
            question: "Explain the standard formulation of a Linear Programming Problem (LPP) and outline the Simplex method steps.",
            answer: "An LPP is formulated as: Maximize/Minimize Z = c_1*x_1 + c_2*x_2 + ... + c_n*x_n (Objective Function) subject to constraints: a_i1*x_1 + a_i2*x_2 + ... <= b_i, and non-negativity: x_j >= 0. The Simplex Method solves this by: (1) Converting inequalities to equalities using slack/surplus variables. (2) Creating an initial Simplex Table. (3) Finding the entering variable (most negative in C_j - Z_j row). (4) Finding the leaving variable (minimum positive ratio test). (5) Executing row transformations around the pivot element. (6) Iterating until all values in C_j - Z_j are non-positive (for maximization)."
          }
        ]
      },
      {
        number: 2,
        title: "Machine Learning Strategy & Team Dynamics",
        contents: "ML readiness, Risk mitigation, Experimental mindset, Build/buy/partner, setting up a team, Understanding and communicating change.",
        keyKeywords: ["ML Readiness", "Risk Mitigation", "Build/Buy/Partner", "Change Management"],
        sampleQuestions: [
          {
            question: "Explain 'ML Readiness' and how organizations assess it before building models.",
            answer: "ML Readiness assesses whether a company is structurally, culturally, and technically prepared to implement AI. It covers four pillars: (1) Data Readiness: data availability, quality, and labeling pipelines. (2) Infrastructure Readiness: storage, GPUs, and deployment architectures. (3) Team Readiness: skillset of engineers and data experts. (4) Business Readiness: alignment of ML goals with concrete business KPIs."
          }
        ]
      },
      {
        number: 3,
        title: "Responsible Machine Learning & Metric Design",
        contents: "AI for good and all, Positive feedback loops and negative feedback loops, Metric design and observing behaviours, Secondary effects of optimization, Regulatory concerns.",
        keyKeywords: ["Positive Feedback Loop", "Secondary Effects", "Metric Bias", "Responsible AI"],
        sampleQuestions: [
          {
            question: "Explain the concept of Negative and Positive Feedback Loops in deployed machine learning models.",
            answer: "1. Positive Feedback Loop: Occurs when a model's predictions affect its future training data in a self-reinforcing way. For example, a recommendation engine only recommends hot topics, making them more popular, and generating more logs of those topics, biasing future training. 2. Negative Feedback Loop: Occurs when user behavior actively counteracts predictions, requiring continuous model recalibration."
          }
        ]
      },
      {
        number: 4,
        title: "Machine Learning in Production & Planning",
        contents: "Integrating info systems, users break things, time and space complexity in production, when to retain the model? Logging ML model versioning, Knowledge transfer, Reporting performance to stakeholders.",
        keyKeywords: ["Model Retraining", "ML Logging", "Time Complexity", "Versioning"],
        sampleQuestions: [
          {
            question: "When should an ML model be retrained in production? What parameters are monitored?",
            answer: "Models are retrained when: (1) Concept Drift: statistical properties of target variables change over time. (2) Data Drift: input feature distributions shift. To monitor this, engineers trace: (a) Model performance metrics (accuracy, F1-score) over time. (b) Feature distribution deviations (using KL Divergence). (c) System logs for execution timeouts or space constraints."
          }
        ]
      },
      {
        number: 5,
        title: "Model Care, QUAM Logging & Dashboard Essentials",
        contents: "MLPL Recap, Post deployment challenges, QUAM monitoring and logging, QUAM Testing, QUAM maintenance, QUAM updating, Separating Datastack from Production, Dashboard Essentials and Metrics monitoring.",
        keyKeywords: ["QUAM Monitoring", "Production Datastack", "Dashboard Essentials", "Post-deployment"],
        sampleQuestions: [
          {
            question: "Describe QUAM (Quality Assurance of Models) monitoring and testing essentials.",
            answer: "QUAM is a structured framework for model maintenance: (1) QUAM Monitoring: Continuous logging of predictions, latencies, and output boundaries. (2) QUAM Testing: Periodic automated unit-tests and validation tests on clean golden datasets to check for regression. (3) Separation of Datastack: Keeping analytical, heavy training datasets isolated from real-time low-latency production pipelines to avoid concurrency locks."
          }
        ]
      }
    ]
  },
  {
    code: "AL-504(A)",
    name: "AI in Health Care",
    category: "Open Elective",
    objectives: [
      "Learn applications of AI in healthcare and disease diagnosis using computer vision.",
      "Explore prognostic modeling, survival calculations, hazard analysis, and clinical treatment effect estimation."
    ],
    outcomes: [
      "Leverage computer vision models for MRI segmentation and cancer diagnosis.",
      "Compute model evaluation parameters like Sensitivity, Specificity, and ROC curves.",
      "Build tree-based and linear prognostic risk models.",
      "Implement Survival analysis, Nelson Aalen estimators, and Treatment effect estimators."
    ],
    textbooks: [
      "Deep Medicine: How Artificial Intelligence Can Make Healthcare Human Again, Eric Topol, Basic Books, 1st edition 2019.",
      "Machine Learning and AI for Healthcare: Big Data for Improved Health Outcomes, Arjun Panesar, Apress, 1st ed. Edition, 2019.",
      "Artificial Intelligence in Healthcare, 2020, Elsevier Inc"
    ],
    references: [
      "Coursera AI for Medical Diagnosis Course Syllabus",
      "Coursera AI for Medical Prognosis Course Syllabus",
      "Coursera AI for Medical Treatment Course Syllabus"
    ],
    units: [
      {
        number: 1,
        title: "Disease Detection with CV & Class Imbalance",
        contents: "Medical Image Diagnosis, Eye Disease and Cancer Diagnosis, Building and Training a Model for Medical Diagnosis, Training, prediction, and loss, Image Classification and Class Imbalance, Generating More Samples, Model Testing.",
        keyKeywords: ["Class Imbalance", "Medical Diagnosis", "Sample Generation", "Eye Disease", "Cancer Classification"],
        sampleQuestions: [
          {
            question: "How do you handle class imbalance in medical image classification models?",
            answer: "Class imbalance is severe in medical imaging (e.g. 99% healthy, 1% diseased). We resolve it by: (1) Weighted Loss Function: Scaling the binary cross-entropy loss dynamically, giving higher cost weights to rare positive disease classes. (2) Sampling Strategies: Resampling normal images down, or oversampling minor disease classes. (3) Data Augmentation: Applying realistic rotations, translations, and elastic deformations to create synthesized diseased images."
          }
        ]
      },
      {
        number: 2,
        title: "Model Evaluation (Sensitivity/Specificity) & MRI Segmentation",
        contents: "Sensitivity, Specificity, and Evaluation Metrics, Accuracy in terms of conditional probability, Confusion matrix, ROC curve and Threshold. Image segmentation on MRI images: Medical Image Segmentation, MRI Data and Image Registration, Segmentation, 2D U-Net and 3D U-Net, Data augmentation and loss function for segmentation (Dice Loss), Different Populations and Diagnostic Technology, External validation.",
        keyKeywords: ["Sensitivity", "Specificity", "ROC Curve", "U-Net", "Dice Loss", "External Validation"],
        sampleQuestions: [
          {
            question: "Define Sensitivity, Specificity, and how they relate to the ROC Curve.",
            answer: "1. Sensitivity (Recall): TP / (TP + FN) - The probability that the model correctly identifies a disease when it is present. 2. Specificity: TN / (TN + FP) - The probability that the model correctly identifies health when the disease is absent. The ROC (Receiver Operating Characteristic) curve plots Sensitivity (True Positive Rate) against 1 - Specificity (False Positive Rate) across various decision thresholds. The Area Under the Curve (AUC) measures aggregate model quality."
          },
          {
            question: "Explain the architecture of 2D U-Net for medical image segmentation.",
            answer: "U-Net is a symmetric encoder-decoder network: (1) Contracting Path (Encoder): A stack of convolutional and max-pooling layers that capture context and features. (2) Expanding Path (Decoder): A stack of up-convolutions that restore spatial resolution for pixel-level masks. (3) Skip Connections: Direct shortcuts passing high-resolution features from contracting to expanding layers, helping reconstruct fine physical details lost during downsampling. Training uses Dice Loss (measuring overlap overlap between masks)."
          }
        ]
      },
      {
        number: 3,
        title: "Linear Prognostic Models & Decision Trees",
        contents: "Medical Prognosis, Atrial fibrillation, Liver Disease Mortality, Risk of heart disease, Evaluating Prognostic Models, Concordant Pairs, Risk Ties, Permissible Pairs. Prognosis with Tree-based models: Decision trees for prognosis, fix overfitting, Different distributions, Missing Data example, Imputation.",
        keyKeywords: ["Concordance Index", "Prognostic Risk", "Decision Trees", "Imputation", "Overfitting"],
        sampleQuestions: [
          {
            question: "How is the Concordance Index (C-Index) calculated for evaluating prognostic models?",
            answer: "The C-index evaluates prognostic models (predicting risk of death or disease onset). It looks at all pairs of patients: (1) Identify Permissible Pairs (where patients have different survival times). (2) A pair is Concordant if the patient who died earlier was predicted to have a higher risk score. (3) A pair is a Risk Tie if risk predictions are equal. C-index = (Concordant Pairs + 0.5 * Risk Ties) / Total Permissible Pairs. A score of 0.5 is random; 1.0 is perfect concordance."
          }
        ]
      },
      {
        number: 4,
        title: "Survival Models & Time-to-Event Hazards",
        contents: "Survival Model, Survival function, collecting time data, estimating the survival function. Build a risk model using linear and tree-based models: Hazard Functions, Relative risk, Individual vs. baseline hazard, Survival Trees, Nelson Aalen estimator.",
        keyKeywords: ["Survival Function", "Hazard Function", "Nelson-Aalen Estimator", "Time-to-Event"],
        sampleQuestions: [
          {
            question: "What is the Hazard Function in survival models, and how does the Nelson-Aalen estimator work?",
            answer: "The Hazard Function h(t) measures the instantaneous rate at which an event (e.g. death) occurs at time t, given survival up to t. The Nelson-Aalen estimator is a non-parametric estimator used to estimate the Cumulative Hazard H(t). It is calculated as the sum of ratios: H(t) = Sum_{t_i <= t} (d_i / n_i), where d_i is the number of events (deaths) at time t_i, and n_i is the total number of individuals at risk just before t_i."
          }
        ]
      },
      {
        number: 5,
        title: "Medical Treatment Effect Estimation",
        contents: "Analyze data from a randomized control trial, Average treatment effect, Conditional average treatment effect, T-Learner, S-Learner, C-for-benefit.",
        keyKeywords: ["Average Treatment Effect", "S-Learner", "T-Learner", "C-for-benefit"],
        sampleQuestions: [
          {
            question: "Differentiate between S-Learner and T-Learner treatment effect estimation models.",
            answer: "Both estimate the Conditional Average Treatment Effect (CATE): (1) S-Learner (Single Learner): Combines the treatment indicator (W) as a regular feature alongside patient characteristics (X) inside a single machine learning model. CATE = M(X, W=1) - M(X, W=0). (2) T-Learner (Two Learners): Trains two separate, independent models - M_0 for control patients (W=0) and M_1 for treated patients (W=1). CATE = M_1(X) - M_0(X). T-learner prevents the model from ignoring the treatment indicator."
          }
        ]
      }
    ]
  },
  {
    code: "AL-504(B)",
    name: "Natural Language Processing",
    category: "Open Elective",
    objectives: [
      "Develop a basic understanding of statistical and grammatical language models.",
      "Explore POS tagging, syntax trees, CFG parsing, semantic attachments, and practical translation engines."
    ],
    outcomes: [
      "Implement N-grams, regular expressions, and minimum edit distance.",
      "Train Hidden Markov Models and Viterbi algorithms for POS tagging.",
      "Construct Context-Free Grammars and parse sentences using dynamic programming.",
      "Demonstrate semantic analysis, sense disambiguation, and machine translation applications."
    ],
    textbooks: [
      "Daniel Jurafsky, James H. Martin, 'Speech and Language Processing: An Introduction to Natural Language Processing, Computational Linguistics and Speech', Pearson.",
      "Steven Bird, Ewan Klein and Edward Loper, 'Natural Language Processing with Python', O'Reilly.",
      "Manning and Schutze, 'Foundations of Statistical Natural Language Processing', MIT Press."
    ],
    references: [
      "Breck Baldwin, 'Language Processing with Java and LingPipe Cookbook', Atlantic Publisher.",
      "Richard M Reese, 'Natural Language Processing with Java', O'Reilly.",
      "Nitin Indurkhya and Fred J. Damerau, 'Handbook of Natural Language Processing', Chapman and Hall/CRC Press."
    ],
    units: [
      {
        number: 1,
        title: "Origins, regular expressions and language models",
        contents: "Origins and challenges of NLP – Language Modeling: Grammar-based LM, Statistical LM – Regular Expressions, Finite-State Automata – English Morphology, Transducers for lexicon and rules, Tokenization, Detecting and Correcting Spelling Errors, Minimum Edit Distance.",
        keyKeywords: ["Minimum Edit Distance", "Finite-State Automata", "Statistical LM", "Tokenization", "Morphology"],
        sampleQuestions: [
          {
            question: "Explain the Minimum Edit Distance algorithm with its dynamic programming formulation.",
            answer: "Minimum Edit Distance measures similarity between two strings by calculating the minimum operations (Insert, Delete, Substitution) to transform string X into Y. Formally, define D(i,j) as the edit distance between X[1..i] and Y[1..j]. The base cases are D(i,0) = i, D(0,j) = j. The recurrence relation is: D(i,j) = min( D(i-1, j) + delete_cost, D(i, j-1) + insert_cost, D(i-1, j-1) + substitution_cost(X[i], Y[j]) ). It builds a 2D matrix of size (M+1)x(N+1) to retrieve the optimal cost."
          }
        ]
      },
      {
        number: 2,
        title: "Word Level Analysis & POS Tagging",
        contents: "Unsmoothed N-grams, Evaluating N-grams, Smoothing (Laplace, Good-Turing, Kneser-Ney), Interpolation and Backoff – Word Classes, Part-of-Speech Tagging, Rule-based, Stochastic and Transformation-based tagging, Issues in PoS tagging – Hidden Markov and Maximum Entropy models, Viterbi algorithms and EM training.",
        keyKeywords: ["N-grams", "Laplace Smoothing", "POS Tagging", "Hidden Markov Model", "Viterbi Algorithm"],
        sampleQuestions: [
          {
            question: "Explain how a Hidden Markov Model (HMM) and the Viterbi Algorithm are used for POS Tagging.",
            answer: "For Part-of-Speech tagging, words represent observed states and POS tags represent hidden states. An HMM utilizes transition probabilities P(tag_i | tag_{i-1}) and emission probabilities P(word_i | tag_i). The Viterbi Algorithm is a dynamic programming method that finds the most probable sequence of tags. It maintains a trellis where v_t(j) is the probability of the most likely tag path ending in state j at step t, calculated recursively as: v_t(j) = max_i ( v_{t-1}(i) * P(tag_j | tag_i) ) * P(word_t | tag_j)."
          }
        ]
      },
      {
        number: 3,
        title: "Syntactic Analysis & CFG Parsing",
        contents: "Context-Free Grammars, Grammar rules for English, Treebanks, Normal Forms for grammar – Dependency Grammar – Syntactic Parsing, Ambiguity, Dynamic Programming parsing (CYK) – Shallow parsing – Probabilistic CFG, Probabilistic CYK, Probabilistic Lexicalized CFGs – Feature structures, Unification of feature structures.",
        keyKeywords: ["Context-Free Grammar", "CYK Algorithm", "Probabilistic CFG", "Dependency Grammar", "Unification"],
        sampleQuestions: [
          {
            question: "Describe the CYK (Cocke-Younger-Kasami) algorithm for parsing CFG.",
            answer: "The CYK algorithm is a dynamic programming algorithm that parses Context-Free Grammars written in Chomsky Normal Form (where rules are A -> BC or A -> a). For a sentence of length N, it builds a triangular table P where P[i,j,A] is true if substring from i to j can be generated by variable A. It starts by setting leaf cells using lexical rules, then recursively fills larger cells by splitting substrings at index k: P[i,j,A] = OR_{i <= k < j, A -> B C} ( P[i,k,B] AND P[k+1, j, C] )."
          }
        ]
      },
      {
        number: 4,
        title: "Semantics & Word Sense Disambiguation (WSD)",
        contents: "Requirements for representation, First-Order Logic, Description Logics – Syntax-Driven Semantic analysis, Semantic attachments – Word Senses, Relations between Senses, Thematic Roles, selectional restrictions – Word Sense Disambiguation, WSD using Supervised, Dictionary & Thesaurus, Bootstrapping methods – Word Similarity using Thesaurus and Distributional methods. Compositional semantics.",
        keyKeywords: ["First-Order Logic", "Thematic Roles", "Word Sense Disambiguation", "Lesk Algorithm", "Word Similarity"],
        sampleQuestions: [
          {
            question: "Explain the Lesk Algorithm for Word Sense Disambiguation.",
            answer: "The Lesk Algorithm is a dictionary-based method for disambiguating word senses. It operates on the idea that words in a sentence will share a common topic. For a target word and its context words in a window, it retrieves the dictionary definition (gloss) of each sense of the target word and compares it with the glosses of the context words. The sense with the highest overlapping word count (overlap score) is selected as the correct sense."
          }
        ]
      },
      {
        number: 5,
        title: "Applications of NLP",
        contents: "intelligent work processors: Machine translation, user interfaces, Man-Machine interfaces, natural language querying, tutoring and authoring systems, speech recognition, and commercial use of NLP.",
        keyKeywords: ["Machine Translation", "Natural Language Querying", "Tutoring Systems", "Man-Machine Interfaces"],
        sampleQuestions: [
          {
            question: "Explain the difference between Rule-Based, Statistical, and Neural Machine Translation.",
            answer: "1. Rule-Based (RBMT): Uses linguistic rules and bilingual dictionaries to map source syntactic trees to target trees. High precision but requires massive manual effort. 2. Statistical (SMT): Uses probability models (Translation model P(f|e) and Language model P(e)) trained on bilingual corpora to translate by mapping phrases. 3. Neural (NMT): Uses sequence-to-sequence neural networks (like Transformers) to encode sentences into continuous vector representations and decode them, generating highly fluent translations."
          }
        ]
      }
    ]
  },
  {
    code: "AL-504(C)",
    name: "Computational Intelligence",
    category: "Open Elective",
    objectives: [
      "Learn basics of soft computing, search models, and decision tree structures.",
      "Explore Fuzzy systems, Rough Set uncertainties, Genetic operations, and Swarm optimization algorithms (ACO, PSO, GWO)."
    ],
    outcomes: [
      "Evaluate problems using state-space search and decision tree classifiers.",
      "Formulate fuzzy logic rules, membership functions, and fuzzy controller systems.",
      "Analyze data dependency reductions via Rough Set approximations.",
      "Design and deploy nature-inspired optimization models (Genetic, ACO, PSO)."
    ],
    textbooks: [
      "Russell C. Eberhart and Yuhui Shi, 'Computational Intelligence: Concepts to Implementations', Morgan Kaufmann.",
      "Andries P. Engelbrecht, 'Computational Intelligence: An Introduction', Wiley.",
      "David E. Goldberg, 'Genetic Algorithm in Search Optimization and Machine Learning', Pearson.",
      "Jagdish Chand Bansal, Pramod Kumar Singh, Nikhil R. Pal, 'Evolutionary and Swarm Intelligence Algorithms', Springer.",
      "S. Rajasekaran, G.A. Vijayalakshmi Pai, 'Neural Networks, Fuzzy Logic, Genetic Algorithms Synthesis and Applications', PHI.",
      "Fuzzy Logic with Engineering Applications, Timothy J. Ross, McGraw-Hill.",
      "Neural Networks: A Comprehensive Foundation, Simon Haykin, Prentice Hall"
    ],
    references: [],
    units: [
      {
        number: 1,
        title: "Introduction to Computational Intelligence & Decision Trees",
        contents: "Basics of CI, History of CI, Adaptation, Learning, Self-Organization, State Space Search and Evolution, CI and Soft Computing, CI Techniques; Applications of CI; Decision Trees: Introduction, Evaluation, Different splitting criterion (Entropy, Information Gain, Gini Index), Implementation aspect of decision tree. Neural Network: Introduction, types, issues, implementation, applications.",
        keyKeywords: ["Soft Computing", "State Space Search", "Decision Trees", "Information Gain", "Gini Index"],
        sampleQuestions: [
          {
            question: "Explain Information Gain and Gini Index splitting criteria in Decision Trees.",
            answer: "1. Information Gain: Measures the reduction in entropy (uncertainty) after partitioning a dataset. Entropy = -Sum(p_i * log2(p_i)). Gain(A) = Entropy(Parent) - Sum(|Child_v|/|Parent| * Entropy(Child_v)). It favors attributes with many values. 2. Gini Index: Measures impurity of a dataset. Gini = 1 - Sum(p_i^2). A lower Gini means higher purity. Splitting is done to minimize Gini index across children nodes."
          }
        ]
      },
      {
        number: 2,
        title: "Fuzzy Set Theory & Inference Systems",
        contents: "Fuzzy Sets, Fuzzy Set Characteristics, Basic Definition and Terminology, Fuzzy Operators, Fuzzy Relations and Composition, Member Function Formulation, Fuzzy Rules and Fuzzy Reasoning, Extension, Fuzzy Inference Systems, Input Space Partitioning and Fuzzy Modeling. Fuzziness and Defuzzification, Fuzzy Controllers, Different Fuzzy Models: Mamdani Fuzzy Models, Sugeno Fuzzy Models, Tsukamoto Fuzzy Models etc. Neuro Fuzzy Modeling, Introduction to Neuro Fuzzy Control.",
        keyKeywords: ["Fuzzy Sets", "Mamdani Fuzzy Model", "Sugeno Fuzzy Model", "Defuzzification", "Membership Function"],
        sampleQuestions: [
          {
            question: "Compare Mamdani and Sugeno Fuzzy Inference Systems.",
            answer: "1. Mamdani Model: The output of the fuzzy rules is described by a fuzzy set represented by a membership function. It requires computationally intensive defuzzification methods (like Centroid method) to obtain a crisp output. It is highly intuitive. 2. Sugeno Model: The output is a linear combination of input variables or a constant value (e.g. z = ax + by + c). It doesn't require a full defuzzification step; it calculates crisp output as a weighted average, which is much faster and fits mathematical optimization."
          }
        ]
      },
      {
        number: 3,
        title: "Rough Set Theory, Graphical Models & HMMs",
        contents: "Rough Set Theory: Introduction, Fundamental Concepts, Knowledge Representation, Set Approximations and Accuracy, Vagueness and Uncertainty in Rough Sets, Rough Membership Function, Attributes Dependency and Reduction, Application Domain, Hidden Markov Model (HMM), Graphical Models, Variable Elimination, Belief Propagation, Markov Decision Processes.",
        keyKeywords: ["Rough Sets", "Set Approximations", "Upper Approximation", "Lower Approximation", "MDP", "Belief Propagation"],
        sampleQuestions: [
          {
            question: "Explain Set Approximations (Lower and Upper) in Rough Set Theory.",
            answer: "Rough Set theory deals with uncertainty due to incomplete information: (1) Lower Approximation (positives): The subset of elements that definitely belong to target set X based on equivalence relation R (all elements in the equivalence class belong to X). (2) Upper Approximation (possibles): The subset of elements that possibly belong to X (at least some elements in the equivalence class belong to X). The Boundary Region is the difference between Upper and Lower approximations."
          }
        ]
      },
      {
        number: 4,
        title: "Evolutionary Computation & Genetic Algorithms",
        contents: "Evolutionary Computation: Genetic Algorithms: Basic Genetics, Concepts, Working Principle, Creation of Offsprings, Encoding (Binary, Value, Permutation), Fitness Function, Selection Functions (Roulette Wheel, Tournament), Genetic Operators-Reproduction, Crossover, Mutation; Genetic Modeling, Benefits; Problem Solving; Introduction to Genetic Programming, Evolutionary Programming, and Evolutionary Strategies.",
        keyKeywords: ["Genetic Algorithms", "Crossover Operator", "Mutation Operator", "Roulette Wheel Selection", "Fitness Function"],
        sampleQuestions: [
          {
            question: "Describe the working cycle of a Genetic Algorithm.",
            answer: "A Genetic Algorithm replicates natural selection to solve optimization problems: (1) Initialization: Generate a random population of candidate chromosomes (encoded solutions). (2) Fitness Evaluation: Compute the fitness score of each chromosome. (3) Selection: Select parent chromosomes based on fitness (e.g. Tournament Selection). (4) Crossover (Recombination): Swap segments of parents to create offspring. (5) Mutation: Randomly flip bits/values in offspring to preserve diversity. (6) Replacement: Update the population. (7) Repeat until convergence."
          }
        ]
      },
      {
        number: 5,
        title: "Swarm Intelligence & Nature Inspired Optimization",
        contents: "Swarm Intelligence: Introduction to Swarm Intelligence, Swarm Intelligence Techniques: Ant Colony Optimization (ACO): Overview, ACO Algorithm; Particle Swarm Optimization (PSO): Basics, Social Network Structures, PSO Parameters and Algorithm; Grey wolf optimization (GWO); Application Domain of ACO and PSO; Bee Colony Optimization etc.; Hybrid CI Techniques and applications; CI Tools.",
        keyKeywords: ["Swarm Intelligence", "Ant Colony Optimization", "Particle Swarm Optimization", "Grey Wolf Optimization", "Pheromones"],
        sampleQuestions: [
          {
            question: "Explain the update formulas in Particle Swarm Optimization (PSO).",
            answer: "PSO simulates bird flocking. Each particle has a position vector X_i and a velocity vector V_i. In each iteration, it updates its velocity and position based on its personal best position (pbest_i) and the global best position in the swarm (gbest): V_i(t+1) = w * V_i(t) + c_1 * r_1 * (pbest_i - X_i(t)) + c_2 * r_2 * (gbest - X_i(t)), and X_i(t+1) = X_i(t) + V_i(t+1). Here, w is inertia weight, c_1 and c_2 are cognitive and social constants, and r_1, r_2 are random numbers."
          }
        ]
      }
    ]
  }
];
