var app = angular.module('Comment', []);
app.controller('CommentCtrl', function($scope) {
  $scope.comments= [
  "This is the first comment!",
  "Here's the second one!",
  "And this is one more.",
  "Here is another one!"
  ];
  $scope.addCommentFromInputBox = function(e) {
      $scope.comments.push($scope.newComment);
      $scope.newComment = '';
  };
});
