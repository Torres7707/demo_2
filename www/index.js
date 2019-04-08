var config = {
      apiKey: "AIzaSyBqFC02mqxdcx9fvvFhB5EFrcxLfFSYjco",
      authDomain: "lab3-3b5a5.firebaseapp.com",
      databaseURL: "https://lab3-3b5a5.firebaseio.com",
      projectId: "lab3-3b5a5",
      storageBucket: "lab3-3b5a5.appspot.com",
      messagingSenderId: "729181102927"
};
firebase.initializeApp(config);
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Disable deprecated features
db.settings({
      timestampsInSnapshots: true
});

Vue.component('page-1', {
      template: '#page-1',

      data: function () {
            return {
                  email: '',
                  password: '',
                  title: 'SIGN IN'

            }
      },
      methods: {
            signIn: function () {
                  firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
                        app.currentPage = 3
                  })



            },
            pageset1: function () {
                  app.currentPage = 2
            }
      }

});

Vue.component('page-2', {
      template: '#page-2',

      data: function () {
            return {
                  title: 'SIGN UP',
                  email: '',
                  password: ''
            }
      },
      methods: {
            register: function () {
                  firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            },
            pageset2: function () {
                  app.currentPage = 1
            }
      }
});

Vue.component('page-3', {
      template: '#page-3',

      data: function () {
            return {
                  messages: [],
                  message: null,
                  feedback: null

            }
      },
      created: function () {
            this.messages = []

            db.collection("message")
                  .onSnapshot((snapshot) => {
                        snapshot.docChanges().forEach(change => {
                              let doc = change.doc
                              this.messages.push({
                                    id: doc.id,
                                    msg: doc.data().msg
                              })
                        });
                  });

            console.log('Read: ', this.messages)
      },
      methods: {
            signOut: function () {
                  firebase.auth().signOut().then(() => {
                        app.currentPage = 1
                  })
            },

            sendmsg: function () {
                  if (this.message) {
                        db.collection("message").add({
                              msg: this.message

                        }).catch(err => {
                              console.log(err)
                        })
                        this.message = null
                        this.feedback = null
                  } else {
                        this.feedback = "You must enter a message in order to send one"
                  }
            }
      }

});



const app = new Vue({
      el: '#app',
      data: function () {
            return {
                  currentPage: 1


            }
      }
})