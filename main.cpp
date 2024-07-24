#include<iostream>
#include<iomanip>
#include <ctime>
#include<vector>
#include <limits>

using namespace std;

//to deal with bad input
int input_num(string prompt)
{
	int ch;
	cout << prompt;
	cin >> ch;
	while (cin.fail())
	{
		cin.clear();
		cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
		cout << "\nInvalid input. Try again. \n" << prompt;
		cin >> ch;
	}
	return ch;
}


//node for sent & received msg SLLs
class msg
{
	public:
		bool star;			//true if msg is starred
		bool sent;			//true if msg has been sent to whom the user wishes to
		bool read;			//true if msg has been read by the logged-in user
		string dt; 			//date & time when msg was sent/received
		string to;			//username of user to whom msg is sent
		string from;		//username of user from whom msg is sent
		string text;		//the actual message
		msg *link;

		msg()
		{
			star = false;
			sent = false;
			read = true;
			to = "";
			from = "";
			text = "";
			link = NULL;
		}
};

//node for user DLL
class user
{
	public:
		bool logged_in;
		string username;
		string password;
		msg *headS; 			//sent msg SLL head
		msg *headR; 			//received msg SLL head
		vector<msg*> trash;		//vector of deleted msg
		user *next;
		user *prev;
		friend class messager;
		user()
		{
			logged_in = false;
			username = "";
			password = "";
			headS = NULL;
			headR = NULL;
			next = NULL;
			prev = NULL;
		}

		void display_msgs(string title, msg *head);				//to display list of sent/inbox msg
		void msg_options(string title, msg **head);				//actions user can perform with displayed list of msg
		void read_msg(msg *head);								//to read a certain msg
		void del_msg(msg **head);								//to delete a certain msg
		void starUnstar_msg(msg *m);							//to mark an msg as important (star) or unstar
		void vec_read_msg(vector<msg*> results);				//to read msg from search results
		void vec_del_msg(vector<msg*> results, msg **head); 	//to delete msg from search results
		void vec_starUnstar(vector<msg*> results); 				//to star/unstar msg from search results
		void search_msg(string title, msg **head);				//to search msg sent to/ received from a user
		void starred_msg(string title, msg **head);				//displays list of starred msg
		void trash_options();									//actions to perform on deleted msg
		void del_permanently();									//to delete a msg from trash (permanently)
		void read_trashMsg();									//to read a msg in trash

};


//to display list of sent/inbox msg
void user::display_msgs(string title, msg *head)
{
	string R[] = { "unread", "read" };
	string S[] = { "unstarred", "starred" };
	cout <<"\n******************************* " <<title<< " *******************************";

	if (head == NULL)
		cout << "\nNo messages to display yet!\n";

	else
	{
		int i = 1;
		cout << "\n-------------------------------------------------------------------------------------------------";
		cout << "\n" << setw(5) << "No." << setw(15) << "From" << setw(15)
				<< "To" << setw(15) << "Message" << setw(14) << "When"
				<< setw(10) << "Status" << setw(14) << "Starred";
		cout << "\n-------------------------------------------------------------------------------------------------";

		msg *m = head;
		while (m != NULL)
		{
			cout << "\n" << setw(5) << i << setw(15) << m->from << setw(15)
					<< m->to << setw(15) << m->text.substr(0, 8) << "..."
					<< setw(14) << m->dt.substr(4, 6) << setw(10) << R[m->read]
					<< setw(14) << S[m->star];
			cout << "\n-------------------------------------------------------------------------------------------------";
			m = m->link;
			i++;
		}
	}
}

//actions user can perform with displayed list of msg
void user::msg_options(string title, msg **head)
{
	int ch;
	do
	{
		display_msgs(title, *head);
		if (*head == NULL)
			return;
		cout << "\n********* " << title << " OPTIONS **********";
		cout << "\n0. Exit";
		cout << "\n1. Read a message";
		cout << "\n2. Delete a message";
		cout << "\n3. Star/Unstar a message";
		ch = input_num("\nEnter your choice: ");
		cout << "\n---------------------------------------------";

		switch (ch)
		{
			case 0:
				break;

			case 1:
				read_msg(*head);
				break;

			case 2:
				del_msg(head);
				break;

			case 3:
				starUnstar_msg(*head);
				break;
		}
	} while (ch != 0);
}

//to read a certain msg
void user::read_msg(msg *head)
{
	int no;
	no = input_num("\nEnter message no. to read: ");
	if (no < 1)
	{
		cout << "\nInvalid message no.";
		return;
	}
	msg *ptr = head;
	for (int i = 1; i < no; i++)
	{
		ptr = ptr->link;
		if (ptr == NULL)
		{
			cout << "\nInvalid message no.";
			return;
		}
	}
	cout << "\n..................................................................";
	cout << "\n************** MESSAGE " << no << " **************";
	cout << "\nFrom : " << ptr->from;
	cout << "\nTo : " << ptr->to;
	cout << "\nWhen : " << ptr->dt;
	cout << "\nMessage : \n" << ptr->text;
	cout << "\n...................................................................\n";
	ptr->read = true;
}

int main()
{
	int ch;

	do
	{
		cout << "\n----------------------------------------";
		cout << "\n******** WELCOME TO MESSAGER **********";
		cout << "\n0. Exit application";
		cout << "\n1. Create new account";
		cout << "\n2. Login to your account";
		cout << "\n3. Delete an existing account";
		cout << "\n4. Change Password";
		ch = input_num("\nEnter your choice: ");
		cout << "\n----------------------------------------";

		switch (ch)
		{
			case 0:
				cout << "\n********* PROGRAM ENDED **********";
				break;

			case 1:
				A.create();
				break;

			case 2:
				A.login();
				break;

			case 3:
				A.remove();
				break;

			case 4:
				A.change_pw();
				break;
			default:
				cout << "\nInvalid choice";
		}

	} while (ch != 0);
	return 0;
}
